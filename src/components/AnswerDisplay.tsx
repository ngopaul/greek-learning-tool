import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import MeaningDisplay from "./MeaningDisplay";
import MorphologyDisplay from "./MorphologyDisplay";
import {Box, Paper} from '@mui/material';

const AnswerDisplay = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {displayWords, currentIndex, testingMode, flipCard} = context;

  if (displayWords.length === 0) {
    return null;
  }

  // Get current word, and words to the left and right
  const currentWord = displayWords[currentIndex];

  if (currentWord.StudyChunkID === "finished round of testing") {
    return null;
  }

  return (<Box sx={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px'
    }}>
      <Box sx={{width: "100%"}}>
        <Paper elevation={3}
               sx={{
                 maxWidth: 350, margin: 'auto', backgroundColor: "white", '&:hover': {
                   backgroundColor: 'grey.100'
                 }, cursor: 'pointer'
               }}
               onClick={flipCard}>
          <Box
            sx={{display: 'flex', justifyContent: 'space-around', padding: 2, maxWidth: '100%', margin: '0 auto',
              overflowX: 'auto', whiteSpace: 'nowrap'
            }}
          >
            {testingMode === 'morphology' ? (<MorphologyDisplay/>) : (<MeaningDisplay/>)}
          </Box>

        </Paper>
      </Box>
    </Box>);
};

export default AnswerDisplay;
