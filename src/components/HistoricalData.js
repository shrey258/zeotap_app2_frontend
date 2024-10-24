import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, CircularProgress, useTheme, Button, Grid, FormControl, InputLabel, Select, MenuItem, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchAllSummaries } from '../services/api';

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState('avg');
  const theme = useTheme();

  const cities = ['Mumbai', 'Delhi', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const metrics = [
    { value: 'avg', label: 'Average Temperature' },
    { value: 'max', label: 'Maximum Temperature' },
    { value: 'min', label: 'Minimum Temperature' },
  ];
  const colors = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.error.main, 
                  theme.palette.warning.main, theme.palette.info.main, theme.palette.success.main];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllSummaries();
        const allSummaries = response.data.summaries;
        const today = new Date().toISOString().split('T')[0];
        const pastData = allSummaries.filter(summary => summary.date !== today);
        
        // Group data by date
        const groupedData = pastData.reduce((acc, curr) => {
          if (!acc[curr.date]) {
            acc[curr.date] = {};
          }
          acc[curr.date][curr.city] = curr;
          return acc;
        }, {});

        // Convert grouped data to array format for chart
        const formattedData = Object.entries(groupedData).map(([date, cities]) => ({
          date,
          ...Object.entries(cities).reduce((acc, [city, data]) => {
            acc[`${city}_avg`] = data.avg_temp;
            acc[`${city}_max`] = data.max_temp;
            acc[`${city}_min`] = data.min_temp;
            return acc;
          }, {})
        }));

        setHistoricalData(formattedData);
        setFilteredData(formattedData);
      } catch (err) {
        console.error('Error fetching historical summaries:', err);
        setError('Failed to fetch historical data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCity === 'All') {
      setFilteredData(historicalData);
    } else {
      setFilteredData(historicalData.map(item => ({
        date: item.date,
        [selectedCity]: item[`${selectedCity}_${selectedMetric}`]
      })));
    }
  }, [selectedCity, selectedMetric, historicalData]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (historicalData.length === 0) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button component={Link} to="/" variant="contained" color="primary" sx={{ mb: 4 }}>
          Back to Dashboard
        </Button>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Historical Weather Data</Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="city-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  value={selectedCity}
                  label="City"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="All">All Cities</MenuItem>
                  {cities.map(city => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="metric-select-label">Metric</InputLabel>
                <Select
                  labelId="metric-select-label"
                  value={selectedMetric}
                  label="Metric"
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  {metrics.map(metric => (
                    <MenuItem key={metric.value} value={metric.value}>{metric.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ height: 500, width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="date" stroke={theme.palette.text.primary} />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`
                  }} 
                />
                <Legend />
                {selectedCity === 'All' 
                  ? cities.map((city, index) => (
                      <Bar key={`${city}_${selectedMetric}`} dataKey={`${city}_${selectedMetric}`} name={city} fill={colors[index]} />
                    ))
                  : <Bar dataKey={selectedCity} name={selectedCity} fill={theme.palette.primary.main} />
                }
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HistoricalData;
