import React, { useContext, useState } from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { ContentCopy, BugReport } from '@mui/icons-material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { listOfBooks } from '../utils/constants';
import {
  bibleBookAbbreviations,
  bibleBookNameToChapterCounts,
  bibleBookVerseCounts
} from '../utils/bibleUtils';
import { AppContext } from '../contexts/AppContext';
import SettingsPopup from './Header/SettingsPopup';
import InfoPopup from './Header/InfoPopup';
import { BookOption, ChapterOption, VerseOption } from '../types/AppContextTypes';
import ChartsPopup from './Header/ChartsPopup';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useHeader } from './useHeader';
import { useNavigation } from './useNavigation';
import SearchPopup from './SearchPopup';
import { searchOpenAtom } from '../atoms/headerAtoms';
import { useAtom } from 'jotai';

let bookOptions: BookOption[] = [];
let startValue = 40;
for (let i = 39; i < listOfBooks.length; i++) {
  const book = listOfBooks[i];
  const label =
    bibleBookAbbreviations[book] ||
    book.charAt(0).toUpperCase() + book.slice(1);
  bookOptions.push({ value: startValue, label });
  startValue++;
}

const animatedComponents = makeAnimated();
const customStyles = {
  option: (provided: any) => ({ ...provided, color: 'black', padding: 10 }),
  singleValue: (provided: any) => ({ ...provided, color: 'black', fontSize: '1rem' }),
  placeholder: (provided: any) => ({ ...provided, color: 'grey' }),
};

const Header: React.FC = () => {
  const [curSelectedVerse, setCurSelectedVerse] = useState<VerseOption>();
  const [handleSettingsClick, handleHelpClick, handleChartsClick, handleSearchClick] =
    useHeader();
  const { navigateTo } = useNavigation();
  const [selectedBookOption, setSelectedBookOption]     = useState<BookOption>();
  const [selectedChapterOption, setSelectedChapterOption] = useState<ChapterOption>();
  const [selectedVerseOption, setSelectedVerseOption]     = useState<VerseOption>();
  const [chapterOptions, setChapterOptions]             = useState<ChapterOption[]>([]);
  const [verseOptions, setVerseOptions]                 = useState<VerseOption[]>([]);
  const [searchOpen, setSearchOpen] = useAtom(searchOpenAtom);

  const context = useContext(AppContext);
  if (!context) return null;
  const { studyChunks, onTesterSelect, setSelectedTesters, handleCopyClick, printDebug, readingMode } =
    context;

  // Generate study-chunk options...
  const createStudyChunkOptions = (sc: any) =>
    Object.keys(sc).map(unit => ({ label: unit, value: unit }));

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              py: 1,
            }}
          >
            {readingMode === 'chapter' && (
              <>
                {/* Book */}
                <Box sx={{ flexGrow: 5, mx: 1 }}>
                  <Select
                    options={bookOptions}
                    onChange={book => {
                      if (!book) return;
                      setSelectedBookOption(book);
                      navigateTo(book); // only book
                      setSelectedChapterOption(undefined);
                      setSelectedVerseOption(undefined);
                      // build chapter list
                      const count = bibleBookNameToChapterCounts[book.label.toLowerCase()];
                      setChapterOptions(
                        Array.from({ length: count }, (_, i) => ({
                          value: i + 1,
                          label: String(i + 1),
                        }))
                      );
                    }}
                    placeholder="Book"
                    styles={customStyles}
                  />
                </Box>

                {/* Chapter */}
                <Box sx={{ flexGrow: 1, mx: 1 }}>
                  <Select
                    value={selectedChapterOption}
                    options={chapterOptions}
                    onChange={chap => {
                      if (!chap || !selectedBookOption) return;
                      setSelectedChapterOption(chap);
                      navigateTo(selectedBookOption, chap);
                      setSelectedVerseOption(undefined);
                      // build verse list
                      const verses =
                        bibleBookVerseCounts[selectedBookOption.label.toLowerCase()][
                          chap.value - 1
                        ];
                      setVerseOptions(
                        Array.from({ length: verses }, (_, i) => ({
                          value: i + 1,
                          label: String(i + 1),
                        }))
                      );
                    }}
                    placeholder="Chapter"
                    styles={customStyles}
                    isClearable
                  />
                </Box>

                {/* Verse */}
                <Box sx={{ flexGrow: 1, mx: 1 }}>
                  <Select
                    value={selectedVerseOption}
                    options={verseOptions}
                    onChange={verse => {
                      if (!verse || !selectedBookOption || !selectedChapterOption)
                        return;
                      setSelectedVerseOption(verse);
                      setCurSelectedVerse(verse);
                      navigateTo(
                        selectedBookOption,
                        selectedChapterOption,
                        verse
                      );
                    }}
                    placeholder="Verse (optional)"
                    styles={customStyles}
                    isClearable
                  />
                </Box>

                {curSelectedVerse && (
                  <>
                    <IconButton color="inherit" onClick={handleCopyClick}>
                      <ContentCopy />
                    </IconButton>
                    <IconButton color="inherit" onClick={printDebug}>
                      <BugReport />
                    </IconButton>
                  </>
                )}
              </>
            )}

            {/* Unit/Testers */}
            <Box sx={{ flexGrow: 7, mx: 2 }}>
              <Select
                components={animatedComponents}
                options={createStudyChunkOptions(studyChunks)}
                isMulti
                onChange={sel => {
                  setSelectedTesters(sel || []);
                  onTesterSelect(sel || []);
                }}
                placeholder="Textbook Unit (optional)"
                styles={customStyles}
              />
            </Box>
          </Box>

          <IconButton color="inherit" onClick={handleChartsClick}>
            <TableChartIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleHelpClick}>
            <QuestionMarkIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <SettingsPopup />
      <InfoPopup />
      <ChartsPopup />
      <SearchPopup />
    </>
  );
};

export default Header;