// SummaryChart.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, CircularProgress, useTheme } from '@mui/material';
import { fetchAllSummaries } from '../services/api';

const SummaryChart = () => {
  const [todaySummaries, setTodaySummaries] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllSummaries();
        const allSummaries = response.data.summaries;
        const today = new Date().toISOString().split('T')[0];
        const todayData = allSummaries.filter(summary => summary.date === today);
        setTodaySummaries(todayData);
      } catch (err) {
        console.error('Error fetching summaries:', err);
        setError('Failed to fetch summary data');
      }
    };

    fetchData();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (todaySummaries.length === 0) return <CircularProgress />;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Today's Weather Summary</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={todaySummaries} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="city" stroke={theme.palette.text.primary} />
          <YAxis stroke={theme.palette.text.primary} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`
            }} 
          />
          <Legend />
          <Line type="monotone" dataKey="avg_temp" name="Avg Temp" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="max_temp" name="Max Temp" stroke={theme.palette.secondary.main} />
          <Line type="monotone" dataKey="min_temp" name="Min Temp" stroke={theme.palette.error.main} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SummaryChart;
