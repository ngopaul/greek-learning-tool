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
          <FormControlLabel value="chapter" control={<Radio/>} label="Bible Reading"/>
          <FormControlLabel value="unit" control={<Radio/>} label="Unit Learning"/>
        </RadioGroup>
      </Box>
      <Typography sx={{mx: 1}} variant="subtitle2" color={grey[500]}>
        Bible reading mode allows you to read through the Bible in Greek with English and grammatical parsing.
        It can also test you on words from chosen units of the Greek Textbook at the same time!
      </Typography>
      <Typography sx={{mx: 1, marginTop: 1}} variant="subtitle2" color={grey[500]}>
        Unit learning mode intelligently collects words from throughout the Bible to
        help you learn the grammar (vocab: in a future update!) from a selected unit from the Greek Textbook.
        The textbook used is "A Reader's Grammar of the Greek New Testament" published by A&C Press and
        authored by Kerry Robichaux and Roger Good.
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2 }} variant="body1">Smart Unit Learning:</Typography>
        <Checkbox
          color="primary"
          checked={smartUnitLearning}
          onChange={() => {handleSetSmartUnitLearning(!smartUnitLearning)}}
        />
      </Box>
      <Typography sx={{mx: 1}} variant="subtitle2" color={grey[500]}>If this is checked, in unit learning mode, αn intelligent algorithm
        will be used to select words from throughout the Bible to help you learn the grammar from a selected unit from
        the Greek Textbook.</Typography>
      <Box sx={{ my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button  sx={{mx: 2}} variant="contained" color="primary" onClick={restartLearning}>
          <Typography sx={{ mx: 2 }} variant="body1">Restart Unit Learning</Typography>
        </Button>
      </Box>
      <Typography sx={{mx: 1}} variant="subtitle2" color={grey[500]}>In unit learning mode, this will generate a new
        set of words to test. Don't worry, your progress on each grammar type is always saved.</Typography>
    </Popup>
  )
}

export default SettingsPopup;