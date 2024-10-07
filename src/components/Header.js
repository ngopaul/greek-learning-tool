import React, {useContext} from 'react';
import {AppBar, Box, IconButton, Toolbar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {listOfBooks} from "../utils/constants";
import {bibleBookAbbreviations, bibleBookNameToChapterCounts, bibleBookVerseCounts} from "../utils/bibleUtils";
import {AppContext} from "../contexts/AppContext";
import SettingsPopup from "./Header/SettingsPopup";
import InfoPopup from "./Header/InfoPopup";

let bookOptions = [];
let startValue = 40;

for (let i = 39; i < listOfBooks.length; i++) {
  let book = listOfBooks[i];
  let capitalizedBook = bibleBookAbbreviations[book] || book.charAt(0).toUpperCase() + book.slice(1);
  bookOptions.push({value: startValue, label: capitalizedBook});
  startValue++;
}

const animatedComponents = makeAnimated();

const customStyles = {
  option: (provided) => ({
    ...provided, color: 'black',      // Customize text color
    padding: 10,         // Customize padding
  }), singleValue: (provided) => ({
    ...provided, color: 'black',      // Customize text color of the selected value
    fontSize: '1.0rem',  // Customize text size
  }), placeholder: (provided) => ({
    ...provided, color: 'grey',       // Customize placeholder text color
  }),
};

const Header = () => {
  const {
    studyChunks,
    onBookSelect,
    onChapterSelect,
    onVerseSelect,
    onTesterSelect,
    selectedBook,
    setSelectedBook,
    chapterOptions,
    setChapterOptions,
    selectedChapter,
    setSelectedChapter,
    verseOptions,
    setVerseOptions,
    setSelectedVerse,
    setSelectedTesters,
    handleSettingsClick,
    selectedVerse,
    handleHelpClick,
    readingMode
  } = useContext(AppContext);

  // Function to generate studyChunkOptions
  const createStudyChunkOptions = (studyChunks) => {
    let studyChunkOptions = [];

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
                      setSelectedBook(selected.label.toLowerCase())
                      onBookSelect(selected);
                      setSelectedChapter(null);
                      setSelectedVerse(null);
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
                      setSelectedChapter(selected);
                      onChapterSelect(selected);
                      setSelectedVerse(null);
                      if (selected && selected.value) {
                        let temporaryVerseOptions = [];
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
                      setSelectedVerse(selected);
                      onVerseSelect(selected);
                    }}
                    placeholder="Verse (optional)"
                    styles={customStyles}
                    isClearable
                  />
                </Box>
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
    </>);
};

export default Header;
