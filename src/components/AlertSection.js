import React from 'react';
import { Paper } from '@mui/material';
import AlertForm from './AlertForm';

const AlertSection = ({ cities }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
      <AlertForm cities={cities} />
    </Paper>
  );
};

export default AlertSection;
