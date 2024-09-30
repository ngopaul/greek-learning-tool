import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Popup from './Popup';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {listOfBooks} from "../utils/constants";
import {bibleBookAbbreviations, bibleBookNameToChapterCounts} from "../utils/bibleUtils";

let bookOptions = [];
let startValue = 40;

for (let i = 39; i < listOfBooks.length; i++) {
  let book = listOfBooks[i];
  let capitalizedBook = bibleBookAbbreviations[book] || book.charAt(0).toUpperCase() + book.slice(1);
  bookOptions.push({ value: String(startValue), label: capitalizedBook });
  startValue++;
}

const studyChunkOptions = [
  { value: 'unit1', label: 'Unit 1' },
  { value: 'unit2', label: 'Unit 2' },
  // Add all study chunks as needed
];

const animatedComponents = makeAnimated();

const Header = ({ onBookSelect, onChapterSelect, onTesterSelect }) => {
  const [homeOpen, setHomeOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [chapterOptions, setChapterOptions] = useState([]);

  const handleHomeClick = () => {
    setHomeOpen(true);
  };

  const handleInfoClick = () => {
    setInfoOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Home Button */}
          <IconButton edge="start" color="inherit" aria-label="home" onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>

          {/* Chapter Dropdown */}
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Select
              options={bookOptions}
              onChange={(selected) => {
                onBookSelect(selected);
                let temporaryChapterOptions = [];
                for (let i = 0; i < bibleBookNameToChapterCounts[selected.label.toLowerCase()]; ++i ) {
                  temporaryChapterOptions.push({'value': i+1, 'label': (i + 1).toString()});
                }
                setChapterOptions(temporaryChapterOptions);
              }}
              placeholder="Select Book"
              isClearable
            />
          </Box>

          {/* Chapter Dropdown */}
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Select
              options={chapterOptions}
              onChange={(selected) => onChapterSelect(selected)}
              placeholder="Select Chapter"
              isClearable
            />
          </Box>

          {/* Tester Dropdown */}
          <Box sx={{ flexGrow: 2, mx: 2 }}>
            <Select
              components={animatedComponents}
              options={studyChunkOptions}
              isMulti
              onChange={(selected) => onTesterSelect(selected)}
              placeholder="Select Tester"
            />
          </Box>

          {/* Info Button */}
          <IconButton edge="end" color="inherit" aria-label="info" onClick={handleInfoClick}>
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Home Popup */}
      <Popup open={homeOpen} onClose={() => setHomeOpen(false)} title="Home">
        <Typography variant="body1">Welcome to the Greek Study Tool!</Typography>
        {/* Add more home content as needed */}
      </Popup>

      {/* Info Popup */}
      <Popup open={infoOpen} onClose={() => setInfoOpen(false)} title="Info">
        <Typography variant="body1">
          This tool helps you improve your Greek by quizzing you on morphology and meanings based on Bible chapters.
        </Typography>
        {/* Add more info content as needed */}
      </Popup>
    </>
  );
};

export default Header;
