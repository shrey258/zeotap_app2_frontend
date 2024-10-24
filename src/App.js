// App.js
import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HistoricalData from './components/HistoricalData';

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1976d2' : '#90caf9', // Sky blue
          },
          secondary: {
            main: mode === 'light' ? '#f57c00' : '#ffb74d', // Orange for sun/warmth
          },
          background: {
            default: mode === 'light' ? '#f0f5f9' : '#0a1929', // Light blue-grey / Dark blue
            paper: mode === 'light' ? '#ffffff' : '#1e2a38',
          },
          text: {
            primary: mode === 'light' ? '#1e2a38' : '#ffffff',
            secondary: mode === 'light' ? '#546e7a' : '#b0bec5',
          },
          error: {
            main: '#d32f2f', // Red for alerts
          },
          warning: {
            main: '#ffa000', // Amber for warnings
          },
          info: {
            main: '#0288d1', // Light blue for info
          },
          success: {
            main: '#388e3c', // Green for success
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 300,
          },
          h2: {
            fontWeight: 400,
          },
          h3: {
            fontWeight: 500,
          },
          h4: {
            fontWeight: 500,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === 'light' 
                  ? '0 4px 6px rgba(0,0,0,0.1)' 
                  : '0 4px 6px rgba(255,255,255,0.1)',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 20,
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard toggleColorMode={toggleColorMode} />} />
          <Route path="/historical" element={<HistoricalData />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
