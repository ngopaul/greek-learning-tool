import React, {useContext} from 'react';
import Header from './components/Header';
import WordDisplay from './components/WordDisplay';
import MorphologyBanner from './components/MorphologyBanner';
import {Container, CircularProgress, Typography} from '@mui/material';
import {AppContext} from "./contexts/AppContext";
import CorrectIncorrectDisplay from "./components/CorrectIncorrectDisplay";
import WordContext from "./components/WordContext";

function App() {
  const { loading, loadProgress } = useContext(AppContext);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: '20%' }}>
        <CircularProgress />
        {
          (loadProgress === 0) ? (
            <Typography variant="h6">
              {"Loading Book Units and Greek Morphologies..."}
            </Typography>
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

        <Typography variant="body1">First-time load may take a bit, depending on your internet speed and
          device's processor.</Typography>
      </Container>
    );
  }

  return (
    <div>
      <Header/>
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
        <CorrectIncorrectDisplay/>
        <WordContext/>
        {/* Make sure that the user can scroll up until the point where the header is no longer visible */}
        <div style={{height: '80vh'}}></div>
      </Container>
      <div>
        <MorphologyBanner/>
      </div>

    </div>
  );
}

export default App;
