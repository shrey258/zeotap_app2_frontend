import React, { useEffect, useState, useCallback } from 'react';
import { List, ListItem, Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';
import { fetchNotifications } from '../services/api';

const NotificationCard = ({ notification }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {notification.city}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {notification.message}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Temperature: {notification.weather_data.temp.toFixed(1)}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Feels like: {notification.weather_data.feels_like.toFixed(1)}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Condition: {notification.weather_data.main}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {new Date(notification.timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const loadNotifications = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await fetchNotifications(limit, (page - 1) * limit);
      const newNotifications = response.data || [];
      if (newNotifications.length < limit) {
        setHasMore(false);
      }
      setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, hasMore]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <Box>
      {notifications.length === 0 && !loading ? (
        <Typography>No notifications available.</Typography>
      ) : (
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index} disablePadding>
              <NotificationCard notification={notification} />
            </ListItem>
          ))}
        </List>
      )}
      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {!loading && hasMore && (
        <Button 
          onClick={() => setPage(prevPage => prevPage + 1)} 
          fullWidth 
          variant="outlined" 
          sx={{ mt: 2 }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default NotificationList;
