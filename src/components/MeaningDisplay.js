import {Typography} from '@mui/material';
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

const MeaningDisplay = () => {
  const {displayWords, currentIndex, showAnswer, flipCard} = useContext(AppContext);

  if (displayWords.length === 0) {
    return null;
  }

  // Get current word, and words to the left and right
  const currentWord = displayWords[currentIndex];

  if (currentWord.StudyChunkID === "finished round of testing") {
    return null;
  }

  // Display question marks if it's a test word and showAnswer is false
  const displayEnglish = !showAnswer ? '[click to flip]' : currentWord.Meaning;

  return (showAnswer ? (<Typography variant="h6">
        {displayEnglish}
      </Typography>) : (<Typography variant="h6" color="red">
        {displayEnglish}
      </Typography>));
};

export default MeaningDisplay;
