// WeatherCard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Grid, Box } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { fetchWeather, fetchCitySummary } from '../services/api';

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherResponse, summaryResponse] = await Promise.all([
          fetchWeather(city),
          fetchCitySummary(city)
        ]);
        setWeather(weatherResponse.data);
        setSummary(summaryResponse.data.summaries[0]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch weather data');
      }
    };

    fetchData();
  }, [city]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!weather || !summary) return <CircularProgress />;

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear': return <WiDaySunny size={50} />;
      case 'clouds': return <WiCloudy size={50} />;
      case 'rain': return <WiRain size={50} />;
      case 'snow': return <WiSnow size={50} />;
      case 'thunderstorm': return <WiThunderstorm size={50} />;
      case 'mist':
      case 'fog':
        return <WiFog size={50} />;
      default: return <WiDaySunny size={50} />;
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{city}</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {getWeatherIcon(weather.main)}
              <Typography variant="h6">{weather.main}</Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h3">{parseFloat(weather.temp).toFixed(1)}°C</Typography>
            <Typography variant="body1">Feels like: {parseFloat(weather.feels_like).toFixed(1)}°C</Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant="body2">Average Temp: {parseFloat(summary.avg_temp).toFixed(1)}°C</Typography>
          <Typography variant="body2">Dominant Condition: {summary.dominant_condition}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
