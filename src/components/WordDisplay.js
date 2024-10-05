import {Box, Button, Icon, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import {listOfBooks} from "../utils/constants";
import {bibleBookAbbreviations} from "../utils/bibleUtils";

const WordDisplay = () => {
  const { displayWords, currentIndex, showAnswer, goLeft, goRight, flipCard,
  readingMode, selectedTesters, startLearning } = useContext(AppContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Change 'sm' to any breakpoint

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
      <Box>
        <Typography variant="h5">
          <b>Finished Round of Testing!</b>
        </Typography>
        <Box sx={{ textAlign: 'center', marginTop: '20%', alignItems: 'center' }}>
          <Button sx={{ minWidth: "100px", maxWidth: "30vw" }} variant="contained"
                  onClick={() => {startLearning()}}>
            Start another round
          </Button>
        </Box>
      </Box>
    )
  }

  const leftWord = displayWords[currentIndex - 1] || { Greek: '', Morphology: '', English: '' };
  const rightWord = displayWords[currentIndex + 1] || { Greek: '', Morphology: '', English: '' };

  // Display question marks if it's a test word and showAnswer is false
  const displayEnglish = !showAnswer ? '?' : currentWord.English;

  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" color="grey" sx={{ mx: 2 }}>
          {bibleBookAbbreviations[listOfBooks[currentWord.BookChapterVerseWord.book - 1]]} {currentWord.BookChapterVerseWord.chapter}:
          {currentWord.BookChapterVerseWord.verse} Word {currentWord.BookChapterVerseWord.word}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row', // Change layout based on screen size
        width: '100%',
        justifyContent: isSmallScreen ? 'center' : 'space-between',
        alignItems: 'center',
      }}>
        {/* Left Arrow Key */}
        <Box sx={{ flexGrow: 1, flexBasis: 0, textAlign: 'center', mx: 2 }} onClick={goLeft}>
          <Icon  fontSize={"large"}>
            <ArrowBackIcon color={leftWord.Greek ? "primary" : "disabled"} fontSize={"large"}/>
          </Icon>
        </Box>

        {/* Left Word */}
        <Box sx={{ flexGrow: 1, flexBasis: 0, textAlign: 'center', mx: 1 }}>
          <Typography variant="h4" color="grey">
            {leftWord?.Greek}
          </Typography>
        </Box>

        {/* Current Word */}
        <Box sx={{ flexGrow: 1, flexBasis: 0, textAlign: 'center', mx: 1 }}>
          <Typography variant="h3">
            {currentWord?.Greek}
          </Typography>
        </Box>

        {/* Right Word */}
        <Box sx={{ flexGrow: 1, flexBasis: 0, textAlign: 'center', mx: 1 }}>
          <Typography variant="h4" color="grey">
            {rightWord?.Greek}
          </Typography>
        </Box>

        {/* Right Arrow Key */}
        <Box sx={{ flexGrow: 1, flexBasis: 0, textAlign: 'center', mx: 2 }} onClick={goRight}>
          <Icon  fontSize={"large"}>
            <ArrowForwardIcon color={rightWord.Greek ? "primary" : "disabled"} fontSize={"large"}/>
          </Icon>
        </Box>
      </Box>

      {/* English Translation */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center',
        alignItems: 'center', marginTop: '20px' }}>
        <Box sx={{ width: "50%" }} onClick={flipCard}>
          <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto' }}>
            {
              showAnswer ? (
                <Typography variant="h6" >
                  {displayEnglish}
                </Typography>
              ) : (
                <Typography variant="h5" color="red">
                  {displayEnglish}
                </Typography>
              )
            }
          </Paper>
        </Box>
      </Box>

    </Box>
  );
};

export default WordDisplay;
