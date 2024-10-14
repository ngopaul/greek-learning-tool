import {Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';

import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

const CorrectIncorrectController = () => {
  const { displayWords, currentIndex, readingMode, markWord, correctLog, testWordIndices} = useContext(AppContext);

  if (displayWords.length === 0) {
    return null;
  }

  if (readingMode === "unit" && currentIndex === displayWords.length - 1) {
    // The last word is just the restart button
    return null;
  }

  // return two icons centered in the middle, an x and a check that are clickable, based on the value of correctLog
  // at the current index
  // if correctLog is true, the check will be a CheckCircleIcon, otherwise it will be a CheckCircleOutlineIcon
  // if correctLog is false, the x will be a CancelIcon, otherwise it will be a HighlightOffIcon
  // if correctLog is null, the icons will be CheckCircleOutlineIcon and HighlightOffIcon
  return (

    <Box sx={{ marginBottom: 1, px: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ px: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Paper elevation={2}
               sx={ testWordIndices.has(currentIndex) ?
                {display: 'flex', justifyContent: 'space-around', padding: 0, width: '40vw', maxWidth: 175, mx: 0,
                  backgroundColor: "white",
                  '&:hover': {
                    backgroundColor: 'grey.100'
                  },
                  cursor: 'pointer'} : {display: 'flex', justifyContent: 'space-around', padding: 0, width: '40vw', maxWidth: 175, mx: 0,}
               }
               onClick={() => {
                 markWord(currentIndex, false);
               }}
               disabled={!testWordIndices.has(currentIndex)}
        >
          {
            correctLog[currentIndex] === false ? (
              <CancelIcon sx={{flex: 1, textAlign: 'center', color: !testWordIndices.has(currentIndex) ? 'grey' : 'red'}}/>
            ) : (
              <HighlightOffIcon sx={{flex: 1, textAlign: 'center', color: !testWordIndices.has(currentIndex) ? 'grey' : 'red'}}/>
            )
          }
        </Paper>
        <Paper elevation={2}
               sx={ testWordIndices.has(currentIndex) ?
                 {display: 'flex', justifyContent: 'space-around', padding: 0, width: '40vw', maxWidth: 175, mx: 0,
                 backgroundColor: "white",
                 '&:hover': {
                   backgroundColor: 'grey.100'
                 },
                 cursor: 'pointer'} : {display: 'flex', justifyContent: 'space-around', padding: 0, width: '40vw', maxWidth: 175, mx: 0,}
               }
               onClick={() => {
                 markWord(currentIndex, true);
               }}
               disabled={!testWordIndices.has(currentIndex)}
        >
          {
            correctLog[currentIndex] === true ? (
              <CheckCircleIcon sx={{flex: 1, textAlign: 'center', color: !testWordIndices.has(currentIndex) ? 'grey' : 'green'}}/>
            ) : (
              <CheckCircleOutlineIcon sx={{flex: 1, textAlign: 'center', color: !testWordIndices.has(currentIndex) ? 'grey' : 'green'}}/>
            )
          }
        </Paper>
      </Box>
    </Box>
  )


};

export default CorrectIncorrectController;
