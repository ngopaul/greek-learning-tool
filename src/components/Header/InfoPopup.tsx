import {Box, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {unitNameToTables} from "../../utils/ChapterTables";
import Popup from "../Popup";
import React, {useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import grey from "@mui/material/colors/grey";

const InfoPopup = () => {
  const theme = useTheme();
  const probablyNoKeyboard = useMediaQuery(theme.breakpoints.down('md'));
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {
    helpOpen, setHelpOpen, testWordIndices, currentIndex, displayWords, selectedTesters
  } = context;

  return (<Popup open={helpOpen} onClose={() => setHelpOpen(false)} title="Help">
      {/* List the keyboard shortcuts:
         LeftArrow = next word
         RightArrow = previous word
         Spacebar/UpArrow/DownArrow = flip card
         > = next tested word (if selected at least one unit to test)
         < = previous tested word (if selected at least one unit to test)
         ? = open or close this menu (showing a helpful chart when testing a unit)
         */}
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        {/* Keyboard Shortcuts Box */}
        {probablyNoKeyboard ? null : (<Box sx={{flexGrow: 1, flexBasis: 0, mx: 2}}>
            <Paper elevation={3} sx={{padding: 3, maxWidth: 400, margin: 'auto', backgroundColor: '#f5f5f5'}}>
              <Typography variant="h6" align="center" gutterBottom>
                <b>Keyboard Shortcuts</b>
              </Typography>
              <Box component="ul" sx={{listStyleType: 'none', paddingLeft: 0, fontSize: '0.8rem'}}>
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
          </Box>)}
        {/* Grammar Tables Box */}
        <Box sx={{flexGrow: 5, flexBasis: 0, mx: 2}}>
          <Typography variant="subtitle2" color={grey[800]}>
            Learn Greek grammar from "A Reader's Grammar of the Greek New Testament"! Try one of the following:
          </Typography>
          <ul>
            <li>
              <Typography variant="subtitle2">
                Select a tester, then click the chart button. Use the show/hide button to hide a table and test your
                memory!
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle2">
                Select a book, chapter, verse, and tester. Read through the Bible and learn how the grammar from that
                chapter is used in the Bible!
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle2">Select a tester, then go to "Settings {">"} Reading Mode: Unit Learning".
                Start testing yourself on grammar to see if you can identify the declination/conjugation/morphology!
              </Typography>
            </li>
          </ul>
        </Box>
      </Box>
    </Popup>)
}

export default InfoPopup;