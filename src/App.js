import React, {useContext} from 'react';
import Header from './components/Header';
import WordDisplay from './components/WordDisplay';
import MorphologyBanner from './components/MorphologyBanner';
import {Container, CircularProgress, Typography} from '@mui/material';
import {AppContext} from "./contexts/AppContext";
import CorrectIncorrectDisplay from "./components/CorrectIncorrectDisplay";

function App() {
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: '20%' }}>
        <CircularProgress />
        <Typography variant="h6">Loading Data...</Typography>
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
      </Container>
      <div>
        <MorphologyBanner/>
      </div>

    </div>
  );
}

export default App;
