import {Box, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {unitNameToTables} from "../../utils/ChapterTables";
import Popup from "../Popup";
import React, {useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import grey from "@mui/material/colors/grey";
import { useAtom } from "jotai";
import { displayWordsAtom } from "../../atoms/bibleDisplayAtoms";
import { chartsOpenAtom } from "../../atoms/headerAtoms";

const ChartsPopup = () => {
  const [displayWords] = useAtom(displayWordsAtom)
  const [chartsOpen, setChartsOpen] = useAtom(chartsOpenAtom);

  const theme = useTheme();
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const { testWordIndices, currentIndex, selectedTesters
  } = context;
  

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
              When you have selected one Textbook Unit, this area will show the grammar tables for that Textbook Unit.
              When you have selected multiple Textbook Units at the same time, 
              this area will ONLY show the relevant grammar tables on a word that is taught in one of the selected Textbook Units.
            </Typography>))}
      </Box>
    </Popup>)
}

export default ChartsPopup;