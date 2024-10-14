import {Box, Button, Icon, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import React, {useContext, useState} from "react";
import {AppContext} from "../contexts/AppContext";
import {listOfBooks} from "../utils/constants";
import {bibleBookAbbreviations} from "../utils/bibleUtils";
import WordInfoPopup from "./WordInfoPopup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import grey from "@mui/material/colors/grey";

const WordDisplay = () => {
  const { displayWords, currentIndex, showAnswer, goLeft, goRight, flipCard,
  readingMode, selectedTesters, startLearning, setWordInfoOpen, correctLog } = useContext(AppContext);
  const [mainWordHovered, setMainWordHovered] = useState(false);
  const theme = useTheme();
  const isProbablyAPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isProbablyAPhoneOrTablet = useMediaQuery(theme.breakpoints.down('md'));

  if (displayWords.length === 0) {
    return (
      readingMode === "chapter" ? (
        <Box sx={{ textAlign: 'center', marginTop: '20%' }}>
          <Typography variant="h6">Please select a book and chapter to begin.</Typography>
        </Box>
      ) : (
        selectedTesters.length === 0 ? (
          <Box sx={{ textAlign: 'center', marginTop: '20%' }}>
            <Typography variant="h6">Please select a unit/tester to begin.</Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: '20%', alignItems: 'center' }}>
            <Button sx={{ minWidth: "100px", maxWidth: "30vw" }} variant="contained"
                    onClick={() => {startLearning()}}>
              Start Learning
            </Button>
          </Box>
        )
      )
    );
  }

  // Get current word, and words to the left and right
  const currentWord = displayWords[currentIndex];

  if (currentWord.StudyChunkID === "finished round of testing") {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Go back to the previous word */}
        <Box
          sx={{
            width: 'max-content', // Ensure arrow takes a fixed percentage of space
            textAlign: 'center',
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Handle overflow gracefully
          }}
          onClick={goLeft}
        >
          <Icon fontSize={"large"}>
            <ArrowBackIcon color={"primary"} fontSize={"large"} />
          </Icon>
        </Box>
        <Box>
          <Box sx={{ textAlign: 'center', marginTop: '20%', alignItems: 'center' }}>
            <Typography variant="h5">
              <b>Finished Round of Testing!</b>
            </Typography>

            {/* Show how many the user got correct, incorrect, and skipped with little icons next to them */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Icon fontSize={"large"}>
                <CheckCircleIcon sx={{color: 'green'}}/>
              </Icon>
              <Typography variant="h6">
                {correctLog.filter((val) => (val === true)).length + " correct"}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Icon fontSize={"large"}>
                <HighlightOffIcon sx={{color: 'red'}}/>
              </Icon>
              <Typography variant="h6">
                {correctLog.filter((val) => (val === false)).length + " incorrect"}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Icon fontSize={"large"}>
                <DoDisturbIcon />
              </Icon>
              <Typography variant="h6">
                {correctLog.filter((val) => (val === null)).length - 1 + " unlabeled"}
              </Typography>
            </Box>
            <Box sx={{maxWidth: '350px'}}>
              <Typography variant="subtitle2" color={grey[500]}>
                [more detailed progress report is in the works! But your progress on each grammar type has been saved]
              </Typography>
            </Box>

            <Button sx={{ minWidth: "100px", maxWidth: "30vw", my: 2}} variant="contained"
                    onClick={() => {startLearning()}}>
              Start another round
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: 'max-content', // Ensure arrow takes a fixed percentage of space
            textAlign: 'center',
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Handle overflow gracefully
          }}
        >
          <Icon fontSize={"large"}></Icon>
        </Box>
      </Box>
    )
  }

  const leftWord = displayWords[currentIndex - 1] || { Greek: '', Morphology: '', English: '' };
  const rightWord = displayWords[currentIndex + 1] || { Greek: '', Morphology: '', English: '' };

  // Display question marks if it's a test word and showAnswer is false
  const displayEnglish = !showAnswer ? '[click to flip]' : currentWord.English;

  return (
    <>
      <WordInfoPopup/>
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5" color="grey" sx={{ mx: 2 }}>
            {bibleBookAbbreviations[listOfBooks[currentWord.BookChapterVerseWord.book - 1]]} {currentWord.BookChapterVerseWord.chapter}:
            {currentWord.BookChapterVerseWord.verse} Word {currentWord.BookChapterVerseWord.word}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left Arrow Key */}
          <Box
            sx={{
              width: 'max-content', // Ensure arrow takes a fixed percentage of space
              textAlign: 'center',
              whiteSpace: 'nowrap', // Prevent text from wrapping
              overflow: 'hidden',
              textOverflow: 'ellipsis', // Handle overflow gracefully
            }}
            onClick={goLeft}
          >
            <Icon fontSize={"large"}>
              <ArrowBackIcon color={leftWord.Greek ? "primary" : "disabled"} fontSize={"large"} />
            </Icon>
          </Box>

          {/* Left Word */}
          {!isProbablyAPhone ? (
            <Box
              sx={{
                width: isProbablyAPhoneOrTablet ? '15%': '20%', // Fixed width to ensure it doesn't shrink or expand
                textAlign: 'left',
                whiteSpace: 'nowrap', // Prevent text from wrapping
                overflow: 'hidden',
              }}
              onClick={goLeft}
            >
              <Typography variant={isProbablyAPhone ? "h5" : "h4"} color="grey">
                {leftWord?.Greek}
              </Typography>
            </Box>
          ) : null}

          {/* Current Word */}
          <Box
            sx={{
              width: isProbablyAPhone ? '80%' : (isProbablyAPhoneOrTablet ? '50%' : '35%'), // Constrain the middle word to prevent overflow
              textAlign: 'center',
              whiteSpace: 'nowrap', // Prevent text from wrapping
              overflow: 'auto',
              borderRadius: 10,
              backgroundColor: "grey.200",
              '&:hover': {
                backgroundColor: 'grey.300'
              },
              cursor: 'pointer'
            }}
            onClick={() => setWordInfoOpen(true)}
          >
            <Typography variant={isProbablyAPhone ? "h4" : "h3"}>
              {currentWord?.Greek}
            </Typography>
          </Box>

          {/* Right Word */}
          {!isProbablyAPhone ? (
            <Box
              sx={{
                width: isProbablyAPhoneOrTablet ? '15%': '20%',
                textAlign: 'center',
                whiteSpace: 'nowrap', // Prevent text from wrapping
                overflow: 'hidden',
              }}
              onClick={goRight}
            >
              <Typography variant={isProbablyAPhone ? "h5" : "h4"} color="grey">
                {rightWord?.Greek}
              </Typography>
            </Box>
          ) : null}

          {/* Right Arrow Key */}
          <Box
            sx={{
              width: 'max-content', // Fixed percentage for the right arrow
              textAlign: 'center',
            }}
            onClick={goRight}
          >
            <Icon fontSize={"large"}>
              {
                rightWord.StudyChunkID === "finished round of testing" ?
                  <DoneAllIcon color="primary" fontSize={"large"}/> :
                  <ArrowForwardIcon color={rightWord.Greek ? "primary" : "disabled"} fontSize={"large"}/>
              }
            </Icon>
          </Box>
        </Box>
      </Box>
    </>

  );
};

export default WordDisplay;
