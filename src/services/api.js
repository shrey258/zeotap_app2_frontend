// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch weather data for a city
export const fetchWeather = (city) => {
  return api.get(`/weather/${city}`);
};

// Fetch summaries for a city
export const fetchCitySummary = (city) => {
  return api.get(`/summaries/${city}`);
};

// Fetch all summaries for all cities
export const fetchAllSummaries = () => {
  return api.get('/all-summaries');
};

// Set alert threshold
export const setAlertThreshold = (city, maxTemp, minTemp, weatherCondition) => {
  return api.post('/set-alert-threshold', {
    city,
    max_temp: maxTemp,
    min_temp: minTemp,
    weather_condition: weatherCondition,
  });
};

// Fetch alert threshold for a city
export const fetchAlertThreshold = (city) => {
  return api.get(`/alert-threshold/${city}`);
};

// Fetch notifications
export const fetchNotifications = (limit, offset) => {
  return api.get(`/notifications?limit=${limit}&offset=${offset}`);
};

// Trigger summary calculation
export const triggerSummaryCalculation = () => {
  return api.post('/trigger-summary-calculation');
};
