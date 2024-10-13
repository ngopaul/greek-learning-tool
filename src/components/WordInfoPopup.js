import {Box, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import Popup from "./Popup";
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import strongsGreekDictionary from "../utils/strongs-greek-dictionary.js";

/*
 * Display the strongsMapping information about the current word
 * 1. Get the current word and therefore its strong's number
 * 2. use strongsMapping to get a mapping from strong's number => morphology => {greek: greek, count: count}
 * 3. for each morphology for the appropriate strong's number, show a line that converts the morphology
 * name to something legible (use rmacDescriptions[morphology])
 * 4. also show the greek and the number of usages
 * 5. maybe dynamically calculate the declension/group? TODO
 */
const WordInfoPopup = () => {
  const { wordInfoOpen, setWordInfoOpen, currentIndex, displayWords, strongsMapping, RMACDescriptions } = useContext(AppContext);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const currentWord = displayWords[currentIndex];
  if (!currentWord) {
    return (
      <Popup open={wordInfoOpen} onClose={() => setWordInfoOpen(false)} title="Invalid Word">
        <Typography variant={"h6"}>
          Current Word not Valid
        </Typography>
      </Popup>
    )
  }
  const currentStrongs = currentWord.StrongsNumber;
  const possibleDeclensions = strongsMapping[currentStrongs];

  return (
    <Popup open={wordInfoOpen} onClose={() => setWordInfoOpen(false)}
           title={"Usages of " + strongsGreekDictionary[currentStrongs]["lemma"]}>
      {
        (Object.keys(possibleDeclensions).map((declension, index) => (
        <Box sx={{py: 1}}>
          <Typography key={index} variant="body1" sx={{flex: 1, textAlign: 'center'}}>
            {RMACDescriptions[declension]}: {possibleDeclensions[declension].greek} ({possibleDeclensions[declension].count})
          </Typography>
        </Box>)))
      }
    </Popup>
  )
}

export default WordInfoPopup;