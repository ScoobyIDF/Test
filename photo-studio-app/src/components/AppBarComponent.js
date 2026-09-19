import React from 'react';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Badge
} from '@mui/material';
import {
  Camera as CameraIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const AppBarComponent = ({ notifications, setOpenStatsDialog, setOpenSettingsDialog, setOpenNotification }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <CameraIcon sx={{ mr: 1, fontSize: '2rem' }} />
          <Typography variant="h6" component="div">
            Studio Photo
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box display="flex" alignItems="center" space={2}>
          <IconButton color="inherit" onClick={() => setOpenNotification(true)}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit" onClick={() => setOpenStatsDialog(true)}>
            <Typography variant="body2" sx={{ mr: 0.5 }}>Statistiques</Typography>
          </IconButton>
          
          <IconButton color="inherit" onClick={() => setOpenSettingsDialog(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
