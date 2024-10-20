import React, {useContext} from 'react';
import Header from './components/Header';
import WordDisplay from './components/WordDisplay';
import MorphologyDisplay from './components/MorphologyDisplay';
import {Container, CircularProgress, Typography, Box} from '@mui/material';
import {AppContext} from "./contexts/AppContext";
import CorrectIncorrectController from "./components/CorrectIncorrectController";
import WordContext from "./components/WordContext";
import StudyProgress from "./components/StudyProgress";
import AnswerDisplay from "./components/AnswerDisplay";

function App() {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const { loading, loadProgress, gotNewData } = context;

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: '20%' }}>
        <CircularProgress />
        {
          (loadProgress === 0) ? (
            <>
              <Typography variant="h6">
                {"Loading Book Units and Greek Morphologies..."}
              </Typography>
              <Typography variant="body1">
                If this takes longer than a couple seconds, check your connection or refresh.
              </Typography>
            </>
          ) : (
            (loadProgress < 99) ? (
              <Typography variant="h6">
                {"Loading and Labeling Bible Data... " + loadProgress.toString() + "%"}
              </Typography>
            ) : (
              <Typography variant="h6">
                {"Marshalling Data for Fast Responsiveness..."}
              </Typography>
            )
          )
        }

        {
          gotNewData ? (
            <Typography variant="body1">
              Got new Bible/unit data from the server! This may take a bit longer than usual.
            </Typography>
          ) : (
            <Typography variant="body1">
              First-time load may take a bit, depending on your internet speed and device's processor.
            </Typography>
          )
        }

      </Container>
    );
  }

  return (
    <div>
      <Header/>
      <StudyProgress/>
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',  // Stack items vertically
        justifyContent: 'center', // Centers items vertically
        textAlign: 'center',
        px: '5%',
        width: 'inherit',
        height: 'inherit'
      }}>
        <WordDisplay/>
        <AnswerDisplay/>
        <CorrectIncorrectController/>
        <WordContext/>
        {/* Make sure that the user can scroll up until the point where the header is no longer visible */}
        <div style={{height: '80vh'}}></div>
      </Container>

    </div>
  );
}

export default App;
