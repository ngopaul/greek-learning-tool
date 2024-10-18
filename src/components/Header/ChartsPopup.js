import {Box, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {unitNameToTables} from "../../utils/ChapterTables";
import Popup from "../Popup";
import React, {useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import grey from "@mui/material/colors/grey";

const ChartsPopup = () => {
  const {
    chartsOpen, setChartsOpen, testWordIndices, currentIndex, displayWords, selectedTesters
  } = useContext(AppContext);
  const theme = useTheme();

  return (<Popup open={chartsOpen} onClose={() => setChartsOpen(false)} title="Grammar Tables">
      {/* List the keyboard shortcuts:
         LeftArrow = next word
         RightArrow = previous word
         Spacebar/UpArrow/DownArrow = flip card
         > = next tested word (if selected at least one unit to test)
         < = previous tested word (if selected at least one unit to test)
         ? = open or close this menu (showing a helpful chart when testing a unit)
         */}
      <Box>
        {(testWordIndices.has(currentIndex)) ? (unitNameToTables[displayWords[currentIndex].StudyChunkID.split(" | ")[0]]) : (selectedTesters.length === 1 ? (unitNameToTables[selectedTesters[0].value]) : (
            <Typography variant="subtitle2" color={grey[800]}>
              When testing one unit, this area will show the grammar tables for the unit being tested.
              When testing multiple units at the same time, this will only show the relevant table on a tested word.
            </Typography>))}
      </Box>
    </Popup>)
}

export default ChartsPopup;