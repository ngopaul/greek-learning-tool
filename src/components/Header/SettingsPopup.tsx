import {Box, Button, Checkbox, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import Popup from "../Popup";
import React, {useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import grey from "@mui/material/colors/grey";
import { settingsOpenAtom } from "../../atoms/headerAtoms";
import { useAtom } from "jotai";

const SettingsPopup = () => {
  const [settingsOpen, setSettingsOpen] = useAtom(settingsOpenAtom);
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const { showAnswerChecked, readingMode, handleCheckboxShowAnswer,
    handleChangeReadingMode, smartUnitLearning, handleSetSmartUnitLearning, restartLearning, showEnglishInContext,
    setShowEnglishInContext, testingMode, setTestingMode} = context;

  return (
    <Popup open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2 }} variant="body1">Testing Mode:</Typography>
        <RadioGroup row={true}
          value={testingMode}
          onChange={(event) => {
            const value = event.target.value;
            switch (value) {
              case "morphology":
                setTestingMode(value);
              case "meaning":
                setTestingMode(value);
              default:
                console.error("tried to set reading mode to something other than chapter or unit");
              }
          }}
          name="learningMode">
          <FormControlLabel value="morphology" control={<Radio/>} label="Morphology (parse the word)"/>
          <FormControlLabel value="meaning" control={<Radio/>} label="Meaning (define the root)"/>
        </RadioGroup>
      </Box>
      <Typography sx={{mx: 1}} variant="subtitle2" color={grey[500]}>
        Choose between testing grammar (parsing the words) or testing meaning (defining the root).
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2 }} variant="body1">Show English below Word Context:</Typography>
        <Checkbox
          color="primary"
          checked={showEnglishInContext}
          onChange={(event) => (setShowEnglishInContext(event.target.checked))}
        />
      </Box>
      <Typography sx={{ mx: 1 }} variant="subtitle2" color={grey[500]}>
        If this is checked, the word context below the main word will also display the English contextual meaning.
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2 }} variant="body1">Show Answer on Non-Tested Words:</Typography>
        <Checkbox
          color="primary"
          checked={showAnswerChecked}
          onChange={handleCheckboxShowAnswer}
        />
      </Box>
      <Typography sx={{ mx: 1 }} variant="subtitle2" color={grey[500]}>If this is checked, in Bible reading mode,
        the answer will be shown on words not within the selected Greek Textbook unit.</Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2 }} variant="body1">Reading Mode:</Typography>
        <RadioGroup
          row={true}
          value={readingMode}
          onChange={handleChangeReadingMode}
          name="learningMode">
          <FormControlLabel value="chapter" control={<Radio/>} label="Reading Mode"/>
          <FormControlLabel value="unit" control={<Radio/>} label="Practice Mode"/>
        </RadioGroup>
      </Box>
      <Typography sx={{mx: 1}} variant="subtitle2" color={grey[500]}>
        Reading Mode allows you to explore the Bible freely, moving through any section without restrictions. 
        It provides access to all Greek annotations, offering grammar insights to enhance your understanding of 
        the original text. This mode is ideal for immersive reading and study, helping you connect with both the 
        meaning and structure of the Scriptures.
      </Typography>
      <Typography sx={{mx: 1, marginTop: 1}} variant="subtitle2" color={grey[500]}>
        Practice Mode lets you engage in focused practice sessions based on specific grammar topics. 
        It intelligently gathers relevant words from across the Bible, testing your understanding of 
        how each topic is used in real scriptural contexts. 
        You can select a unit from A Reader's Grammar of the Greek New Testament (by Kerry Robichaux and Roger Good, A&C Press) 
        as the foundation for your practice. 
        This mode is designed to reinforce your grammar skills, with vocabulary exercises planned for a future update.
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2 }} variant="body1">Practice Mode: Smart Learning Algorithm</Typography>
        <Checkbox
          color="primary"
          checked={smartUnitLearning}
          onChange={() => {handleSetSmartUnitLearning(!smartUnitLearning)}}
        />
      </Box>
      <Typography sx={{mx: 1}} variant="subtitle2" color={grey[500]}>If this is checked, in Practice Mode, αn intelligent algorithm
        will be used maximize your learning.</Typography>
      <Box sx={{ my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button  sx={{mx: 2}} variant="contained" color="primary" onClick={restartLearning}>
          <Typography sx={{ mx: 2 }} variant="body1">Restart Practice Mode</Typography>
        </Button>
      </Box>
      <Typography sx={{mx: 1}} variant="subtitle2" color={grey[500]}>In Practice Mode, this will generate a new
        set of words to test. Your progress on each grammar type is always saved.</Typography>
    </Popup>
  )
}

export default SettingsPopup;