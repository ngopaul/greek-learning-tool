import React, {useContext, useState} from 'react';
import {AppBar, Box, IconButton, Toolbar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ContentCopy, BugReport } from '@mui/icons-material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {listOfBooks} from "../utils/constants";
import {bibleBookAbbreviations, bibleBookNameToChapterCounts, bibleBookVerseCounts} from "../utils/bibleUtils";
import {AppContext} from "../contexts/AppContext";
import SettingsPopup from "./Header/SettingsPopup";
import InfoPopup from "./Header/InfoPopup";
import { BookOption, ChapterOption, VerseOption } from '../types/AppContextTypes';
import ChartsPopup from "./Header/ChartsPopup";
import TableChartIcon from '@mui/icons-material/TableChart';
import { useHeader } from './useHeader';
import { useNavigation } from './useNavigation';

let bookOptions : BookOption[] = [];
let startValue = 40;

for (let i = 39; i < listOfBooks.length; i++) {
  let book = listOfBooks[i];
  let capitalizedBook = bibleBookAbbreviations[book] || book.charAt(0).toUpperCase() + book.slice(1);
  bookOptions.push({value: startValue, label: capitalizedBook});
  startValue++;
}

const animatedComponents = makeAnimated();


// TODO (Caleb): clean up the anys!!
const customStyles = {
  option: (provided: any) => ({
    ...provided, color: 'black',      // Customize text color
    padding: 10,         // Customize padding
  }), singleValue: (provided: any) => ({
    ...provided, color: 'black',      // Customize text color of the selected value
    fontSize: '1.0rem',  // Customize text size
  }), placeholder: (provided: any) => ({
    ...provided, color: 'grey',       // Customize placeholder text color
  }),
};

const Header = () => {
  // Currently the 'selectedVerse' state is not reactive. Use this as temporary measure until 'selectedVerse' is reactive.
  const [curSelectedVerse, setCurSelectedVerse] = React.useState<VerseOption>();
  const [handleSettingsClick, handleHelpClick, handleChartsClick] = useHeader();
  const {
    onVerseSelect,
    onBookSelect,
    onChapterSelect,
  
  } = useNavigation();
  const [selectedBook, setSelectedBook] = useState<string>();
  const [selectedChapter, setSelectedChapter] = useState<ChapterOption>();
  const [selectedVerse, setSelectedVerse] = useState<VerseOption>();
  const [chapterOptions, setChapterOptions] = useState<ChapterOption[]>([]);
  const [verseOptions, setVerseOptions] = useState<VerseOption[]>([]);




  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {
    studyChunks,
    onTesterSelect,
    setSelectedTesters,
    handleCopyClick,
    printDebug,
    readingMode
  } = context;

  

  type StudyChunkOption = {label: string, value: string}

  // Function to generate studyChunkOptions
  // TODO (Caleb): investigate this any.
  const createStudyChunkOptions = (studyChunks: any): StudyChunkOption[] => {
    let studyChunkOptions: StudyChunkOption[] = [];

    Object.keys(studyChunks).forEach(unit => {
      const label = `${unit}`;
      const value = `${unit}`; // You can customize the value based on your requirements
      studyChunkOptions.push({label, value});
    });

    return studyChunkOptions;
  };

  return (<>
      <AppBar position="static">
        <Toolbar>
          {/* Home Button */}
          <IconButton edge="start" color="inherit" aria-label="home" onClick={handleSettingsClick}>
            <SettingsIcon/>
          </IconButton>
          <Box sx={{
            display: 'flex', flexDirection: 'row', // Change layout based on screen size
            width: '100%', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 1, py: 1
          }}>
            {readingMode === 'chapter' ? (<>
                {/* Book Dropdown */}
                <Box sx={{flexGrow: 5, mx: 1}}>
                  <Select
                    options={bookOptions}
                    onChange={(selected) => {
                      if (selected === null) {
                        console.error("selected book is null somehow. investigate");
                        return;
                      }
                      setSelectedBook(selected.label.toLowerCase())
                      onBookSelect(selected);
                      setSelectedChapter(undefined);
                      setSelectedVerse(undefined);
                      let temporaryChapterOptions = [];
                      for (let i = 0; i < bibleBookNameToChapterCounts[selected.label.toLowerCase()]; ++i) {
                        temporaryChapterOptions.push({'value': i + 1, 'label': (i + 1).toString()});
                      }
                      setChapterOptions(temporaryChapterOptions);
                    }}
                    placeholder="Book"
                    styles={customStyles}
                  />
                </Box>

                {/* Chapter Dropdown */}
                <Box sx={{flexGrow: 1, mx: 1}}>
                  <Select
                    value={selectedChapter}
                    options={chapterOptions}
                    onChange={(selected) => {
                      if (!selected) {
                        console.error("chapter dropdown onchange is undefined somehow. investigate");
                        return;
                      }
                      //TODO Caleb: replicate this pattern in other places.
                      setSelectedChapter(selected === null ? undefined : selected);
                      onChapterSelect(selected);
                      setSelectedVerse(undefined);
                      if (selected && selected.value) {
                        let temporaryVerseOptions = [];
                        if (selectedBook === undefined) {
                          console.error("selectedBook is undefined somehow. inestigate this")
                          return;
                        }
                        // bibleBookVerseCounts maps lowercase bible book names to a list of verses in each chapter
                        const verseCount = bibleBookVerseCounts[selectedBook.toLowerCase()][selected.value - 1];
                        for (let i = 0; i < verseCount; ++i) {
                          temporaryVerseOptions.push({'value': i + 1, 'label': (i + 1).toString()});
                        }
                        setVerseOptions(temporaryVerseOptions);
                      }
                    }}
                    placeholder="Chapter"
                    styles={customStyles}
                    isClearable
                  />
                </Box>

                {/* Verse Dropdown */}
                <Box sx={{flexGrow: 1, mx: 1}}>
                  <Select
                    value={selectedVerse}
                    options={verseOptions}
                    onChange={(selected) => {
                      if (!selected) {
                        console.error("verse dropdown onchange is undefined somehow. investigate");
                        return;
                      }
                      setSelectedVerse(selected);
                      setCurSelectedVerse(selected);
                      onVerseSelect(selected);
                    }}
                    placeholder="Verse (optional)"
                    styles={customStyles}
                    isClearable
                  />
                </Box>
                {curSelectedVerse ? (
                  <>
                  {/* Copy click */}
                <IconButton edge="start" color="inherit" aria-label="home" onClick={handleCopyClick}>
                  <ContentCopy/>
                </IconButton>
                {/* print debug */}
              <IconButton edge="start" color="inherit" aria-label="home" onClick={printDebug}>
                <BugReport/>
              </IconButton>
              </>): null}
                
              </>) : null}

            {/* Tester/Unit Dropdown */}
            <Box sx={{flexGrow: 7, mx: 2}}>
              <Select
                components={animatedComponents}
                options={createStudyChunkOptions(studyChunks)}
                isMulti
                onChange={(selected) => {
                  setSelectedTesters(selected);
                  onTesterSelect(selected);
                }}
                placeholder="Tester (optional)"
                styles={customStyles}
              />
            </Box>
          </Box>
          {/* Charts Button */}
          <IconButton color="inherit" aria-label="charts" onClick={handleChartsClick}>
            <TableChartIcon/>
          </IconButton>
          {/* Info Button */}
          <IconButton edge="end" color="inherit" aria-label="info" onClick={handleHelpClick}>
            <QuestionMarkIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Settings Popup */}
      <SettingsPopup/>

      {/* Info Popup */}
      <InfoPopup/>

      {/* Charts Popup */}
      <ChartsPopup/>
    </>);
};

export default Header;
