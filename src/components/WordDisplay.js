import { Box, Typography } from '@mui/material';

const WordDisplay = ({ currentChapter, displayWords, currentIndex, showAnswer }) => {

  if (!currentChapter || !currentChapter.data) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20%' }}>
        <Typography variant="h6">Please select a chapter to begin.</Typography>
      </Box>
    );
  }

  if (displayWords.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20%' }}>
        <Typography variant="h6">No words found for the selected chapter.</Typography>
      </Box>
    );
  }

  // Get current word, and words to the left and right
  const currentWord = displayWords[currentIndex];
  const leftWord = displayWords[currentIndex - 1] || { Greek: '', Morphology: '', English: '' };
  const rightWord = displayWords[currentIndex + 1] || { Greek: '', Morphology: '', English: '' };

  // Display question marks if it's a test word and showAnswer is false
  const displayEnglish = !showAnswer ? '?' : currentWord.English;

  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Left Word */}
        <Typography variant="h4" color="grey" sx={{ mx: 2 }}>
          {leftWord.Greek}
        </Typography>

        {/* Current Word */}
        <Typography variant="h3" sx={{ mx: 2 }}>
          {currentWord.Greek}
        </Typography>

        {/* Right Word */}
        <Typography variant="h4" color="grey" sx={{ mx: 2 }}>
          {rightWord.Greek}
        </Typography>
      </Box>

      {/* English Translation */}
      <Typography variant="h6" sx={{ marginTop: '20px' }}>
        {displayEnglish}
      </Typography>
    </Box>
  );
};

export default WordDisplay;
