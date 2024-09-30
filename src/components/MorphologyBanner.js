import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MorphologyBanner = ({ currentChapter, currentIndex, displayWords, testWordIndices, showAnswer }) => {
  if (!currentChapter || !currentChapter.data) {
    return null;
  }

  if (displayWords.length === 0) {
    return null;
  }

  const currentWord = displayWords[currentIndex];
  const isTestWord = testWordIndices.has(currentIndex);

  // Split morphology into parts or show question marks
  const morphParts = isTestWord && !showAnswer ? ['?'] : currentWord.Morphology.split(' | ');

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', bgcolor: 'background.paper', py: 2 }}>
      <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
        {morphParts.map((part, index) => (
          <Typography key={index} variant="body1" sx={{ flex: 1, textAlign: 'center' }}>
            {part}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
};

export default MorphologyBanner;
