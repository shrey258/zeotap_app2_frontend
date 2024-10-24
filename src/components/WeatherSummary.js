import React from 'react';
import { Paper, Typography } from '@mui/material';
import SummaryChart from './SummaryChart';

const WeatherSummary = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Weather Summary</Typography>
      <SummaryChart />
    </Paper>
  );
};

export default WeatherSummary;
