import React, {useContext} from 'react';
import {Box, Typography} from '@mui/material';
import {AppContext} from "../contexts/AppContext";
import { useAtom } from 'jotai';
import { displayWordsAtom } from '../atoms/bibleDisplayAtoms';
import { useNavigation } from './useNavigation';

const MorphologyDisplay = () => {
  const [displayWords] = useAtom(displayWordsAtom)
  const {currentIndex} = useNavigation();


  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const { showAnswer, RMACDescriptions, flipCard} = context;

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

  return (showAnswer ? (<> {(morphParts.map((part, index) => (<Box key={"morphology-banner-" + index} sx={{px: 1}}>
      <Typography variant="body1" sx={{flex: 1, textAlign: 'center'}}>
        {part}
      </Typography>
    </Box>))) }</> ) : (
      <Box sx={{px: 1}}>
        <Typography variant="body1" color="red" sx={{flex: 1, textAlign: 'center'}}>
          [click to flip]
        </Typography>
      </Box>))
};

export default MorphologyDisplay;
