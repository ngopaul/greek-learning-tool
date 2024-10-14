import React, {useContext} from 'react';
import {Box, Paper, Typography} from '@mui/material';
import {AppContext} from "../contexts/AppContext";

const MorphologyBanner = () => {
  const { currentIndex, displayWords, showAnswer, RMACDescriptions, flipCard } = useContext(AppContext);

  if (displayWords.length === 0) {
    return null;
  }

  const currentWord = displayWords[currentIndex];

  if (!currentWord.Greek) {
    return null;
  }

  // Split morphology into parts or show question marks
  const morphologyDescription = RMACDescriptions[currentWord.Morphology];
  const morphParts = !showAnswer ? ['[click to flip]'] : morphologyDescription.split(', ');

  return (
    <Box sx={{position: 'fixed', bottom: 0, width: 'calc(100vw - 32px)', bgcolor: 'background.paper', py: 2, px: 2}}
         onClick={flipCard}
    >
      <Paper elevation={3}
             sx={{display: 'flex', justifyContent: 'space-around', padding: 2, maxWidth: '100%', margin: '0 auto',
             overflowX: 'auto', whiteSpace: 'nowrap'
             }}>
        {showAnswer ? (morphParts.map((part, index) => (
            <Box key={"morphology-banner-" + index} sx={{px: 1}}>
              <Typography variant="body1" sx={{flex: 1, textAlign: 'center'}}>
                {part}
              </Typography>
            </Box>))) : (morphParts.map((part, index) => (
          <Box sx={{px: 1}}>
            <Typography key={index} variant="body1" color="red" sx={{flex: 1, textAlign: 'center'}}>
              {part}
            </Typography>
          </Box>)))}
      </Paper>
    </Box>);
};

export default MorphologyBanner;
