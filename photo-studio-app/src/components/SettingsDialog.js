import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, Button, Typography, Divider, Box
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const SettingsDialog = ({
  open,
  onClose,
  studioHours,
  formatStudioHours,
  generateDemoData,
  resetData
}) => {
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Paramètres</DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">Horaires du studio</Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>
          
          {Object.entries(studioHours).map(([day, hours]) => (
            <Grid item xs={12} key={day}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Typography>
                <Typography variant="body2" color={hours.closed ? 'error' : 'text.primary'}>
                  {formatStudioHours(day)}
                </Typography>
              </Box>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>Données</Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              onClick={generateDemoData}
              fullWidth
            >
              Générer des données de démonstration
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              variant="outlined" 
              color="error"
              startIcon={<DeleteIcon />}
              onClick={resetData}
              fullWidth
            >
              Réinitialiser toutes les données
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
