import React from 'react';
import { Container, Grid, Typography, AppBar, Toolbar, Paper, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HistoryIcon from '@mui/icons-material/History';
import { useTheme } from '@mui/material/styles';
import WeatherSummary from './WeatherSummary';
import CityWeather from './CityWeather';
import NotificationList from './NotificationList';
import AlertSection from './AlertSection';

const cities = ['Mumbai', 'Delhi', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const Dashboard = ({ toggleColorMode }) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
    }}>
      <AppBar 
        position="static" 
        color="default" 
        elevation={4} 
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
            Weather Monitor
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              component={Link} 
              to="/historical"
              startIcon={<HistoryIcon />}
              sx={{ 
                mr: 2,
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: theme.palette.primary.main,
                },
                transition: 'color 0.3s',
              }}
            >
              Historical Data
            </Button>
            <IconButton 
              onClick={toggleColorMode} 
              sx={{
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: theme.palette.primary.main,
                },
                transition: 'color 0.3s',
              }}
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
              <WeatherSummary />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
              <Typography variant="h5" gutterBottom>City Weather</Typography>
              <Grid container spacing={3}>
                {cities.map(city => (
                  <Grid item xs={12} sm={6} md={4} key={city}>
                    <CityWeather city={city} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%', backgroundColor: theme.palette.background.paper }}>
              <AlertSection cities={cities} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%', backgroundColor: theme.palette.background.paper }}>
              <Typography variant="h5" gutterBottom>Notifications</Typography>
              <NotificationList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
