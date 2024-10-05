import {Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';

import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

const CorrectIncorrectDisplay = () => {
  const { displayWords, currentIndex, readingMode, markWord, correctLog, testWordIndices} = useContext(AppContext);

  if (displayWords.length === 0) {
    return null;
  }

  if (readingMode === "unit" && currentIndex === displayWords.length - 1) {
    // The last word is just the restart button
    return null;
  }

  if (readingMode === "chapter" && !testWordIndices.has(currentIndex)) {
    // The last word is just the restart button
    return null;
  }

  // return two icons centered in the middle, an x and a check that are clickable, based on the value of correctLog
  // at the current index
  // if correctLog is true, the check will be a CheckCircleIcon, otherwise it will be a CheckCircleOutlineIcon
  // if correctLog is false, the x will be a CancelIcon, otherwise it will be a HighlightOffIcon
  // if correctLog is null, the icons will be CheckCircleOutlineIcon and HighlightOffIcon
  return (

    <Box sx={{ py: 2, px: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ py: 2, px: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Paper elevation={2}
               sx={{display: 'flex', justifyContent: 'space-around', padding: 2, maxWidth: '100%', mx: 1}}
               onClick={() => {
                 markWord(currentIndex, false);
               }}
        >
          {
            correctLog[currentIndex] === false ? (
              <CancelIcon sx={{flex: 1, textAlign: 'center', color: 'red'}}/>
            ) : (
              <HighlightOffIcon sx={{flex: 1, textAlign: 'center', color: 'red'}}/>
            )
          }
        </Paper>
        <Paper elevation={2}
               sx={{display: 'flex', justifyContent: 'space-around', padding: 2, maxWidth: '100%', mx: 1}}
               onClick={() => {
                 markWord(currentIndex, true);
               }}
        >
          {
            correctLog[currentIndex] === true ? (
              <CheckCircleIcon sx={{flex: 1, textAlign: 'center', color: 'green'}}/>
            ) : (
              <CheckCircleOutlineIcon sx={{flex: 1, textAlign: 'center', color: 'green'}}/>
            )
          }
        </Paper>
      </Box>
    </Box>
  )


};

export default CorrectIncorrectDisplay;
