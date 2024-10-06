import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {AppProvider} from "./contexts/AppContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#E8D5BA', // Customize as needed
    },
    secondary: {
      main: '#314273',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Change to a Greek-friendly font if desired
  },
  components: {
    // Override MUI components styles
    MuiSelect: {
      styleOverrides: {
        select: {
          color: 'black',  // Selected item text color
          backgroundColor: 'white',  // Dropdown background color
        },
        icon: {
          color: 'black',  // Arrow icon color
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',  // Dropdown items text color
          backgroundColor: 'white',  // Background color of items
          '&.Mui-selected': {
            backgroundColor: '#e0e0e0',  // Selected item background color
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',  // Dropdown container background
          color: 'black',            // Text color inside dropdown
        },
      },
    },
  },
});

root.render(
  <AppProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
