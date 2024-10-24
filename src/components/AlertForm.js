// AlertForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { setAlertThreshold } from '../services/api';

const AlertForm = ({ cities }) => {
  const [city, setCity] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      setError('Please select a city');
      return;
    }
    try {
      await setAlertThreshold(city, maxTemp, minTemp, weatherCondition);
      setSuccess(true);
      setError(null);
      // Reset form
      setCity('');
      setMaxTemp('');
      setMinTemp('');
      setWeatherCondition('');
    } catch (err) {
      console.error('Error setting alert threshold:', err);
      setError('Failed to set alert threshold');
      setSuccess(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Set Weather Alert</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          value={city}
          label="City"
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Max Temp"
        type="number"
        value={maxTemp}
        onChange={(e) => setMaxTemp(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Min Temp"
        type="number"
        value={minTemp}
        onChange={(e) => setMinTemp(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Weather Condition"
        value={weatherCondition}
        onChange={(e) => setWeatherCondition(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Set Alert
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>Alert threshold set successfully</Alert>}
    </Box>
  );
};

export default AlertForm;
