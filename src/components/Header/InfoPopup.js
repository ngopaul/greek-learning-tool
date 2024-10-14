import {Box, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {unitNameToTables} from "../../utils/ChapterTables";
import Popup from "../Popup";
import React, {useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import grey from "@mui/material/colors/grey";

const InfoPopup = () => {
  const { helpOpen, setHelpOpen, testWordIndices, currentIndex, displayWords,
    selectedTesters } = useContext(AppContext);
  const theme = useTheme();
  const probablyNoKeyboard = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Popup open={helpOpen} onClose={() => setHelpOpen(false)} title="Help">
      {/* List the keyboard shortcuts:
         LeftArrow = next word
         RightArrow = previous word
         Spacebar/UpArrow/DownArrow = flip card
         > = next tested word (if selected at least one unit to test)
         < = previous tested word (if selected at least one unit to test)
         ? = open or close this menu (showing a helpful chart when testing a unit)
         */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Keyboard Shortcuts Box */}
        { probablyNoKeyboard ? null : (
          <Box sx={{ flexGrow: 1, flexBasis: 0, mx: 2 }}>
            <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" align="center" gutterBottom>
                <b>Keyboard Shortcuts</b>
              </Typography>
              <Box component="ul" sx={{ listStyleType: 'none', paddingLeft: 0, fontSize: '0.8rem' }}>
                <li>
                  <pre>← previous word</pre>
                </li>
                <li>
                  <pre>→ next word</pre>
                </li>
                <li>
                  <pre>↑ mark correct</pre>
                </li>
                <li>
                  <pre>↓ mark incorrect</pre>
                </li>
                <li>
                  <pre>space flip card</pre>
                </li>
                <li>
                  <pre>&lt; previous tested word</pre>
                </li>
                <li>
                  <pre>&gt; next tested word</pre>
                </li>
                <li>
                  <pre>? open this menu (info)</pre>
                </li>
                <li>
                  <pre>/ open settings</pre>
                </li>
              </Box>
            </Paper>
          </Box>
        )}
        {/* Grammar Tables Box */}
        <Box sx={{ flexGrow: 5, flexBasis: 0, mx: 2 }}>
          <Typography variant="subtitle2" color={grey[800]}>
            Learn Greek grammar and vocabulary from "A Reader's Grammar of the Greek New Testament"!
            By selecting a unit to test, those words will be hidden ("?") as you go through the Bible.
            Also check out "Unit Learning" in settings - use the whole Bible to learn the grammar of a unit!
          </Typography>
          <hr/>
          {
            (
              testWordIndices.has(currentIndex)
            ) ? (unitNameToTables[displayWords[currentIndex].StudyChunkID.split(" | ")[0]]) :
              (
                selectedTesters.length === 1 ? (unitNameToTables[selectedTesters[0].value]) : (
                  <Typography variant="subtitle2" color={grey[800]}>
                    When testing one unit, this area will show the grammar tables for the unit being tested.
                    When testing multiple units at the same time, this will only show the relevant table on a tested word.
                  </Typography>
                )
              )
          }
        </Box>
      </Box>
    </Popup>
  )
}

export default InfoPopup;