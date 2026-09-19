import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, TextField, FormControl, InputLabel, Select, MenuItem,
  Button, Box, Typography
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { format, addHours, parseISO } from 'date-fns';

const AppointmentForm = ({
  open,
  onClose,
  appointment,
  setAppointment,
  services,
  statuses,
  studioHours,
  onSubmit,
  selectedAppointment
}) => {
  
  const handleServiceChange = (e) => {
    const service = services.find(s => s.id === e.target.value);
    const newStartTime = appointment.startTime || '09:00';
    const newEndTime = format(addHours(parseISO(`${appointment.date || format(new Date(), 'yyyy-MM-dd')}T${newStartTime}`), (service?.duration || 60) / 60), 'HH:mm');
    
    setAppointment({
      ...appointment,
      service: e.target.value,
      price: service?.price || 0,
      endTime: newEndTime
    });
  };

  const handleStartTimeChange = (e) => {
    const service = services.find(s => s.id === appointment.service);
    const newStartTime = e.target.value;
    const duration = service?.duration || 60;
    const newEndTime = format(addHours(parseISO(`${appointment.date || format(new Date(), 'yyyy-MM-dd')}T${newStartTime}`), duration / 60), 'HH:mm');
    
    setAppointment({
      ...appointment,
      startTime: newStartTime,
      endTime: newEndTime
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedAppointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Informations client */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">Informations client</Typography>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '8px 0' }} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom du client"
              value={appointment.client.name}
              onChange={(e) => setAppointment({...appointment, client: {...appointment.client, name: e.target.value}})}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Téléphone"
              value={appointment.client.phone}
              onChange={(e) => setAppointment({...appointment, client: {...appointment.client, phone: e.target.value}})}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              value={appointment.client.email}
              onChange={(e) => setAppointment({...appointment, client: {...appointment.client, email: e.target.value}})}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Notes client"
              value={appointment.client.notes}
              onChange={(e) => setAppointment({...appointment, client: {...appointment.client, notes: e.target.value}})}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          {/* Informations rendez-vous */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">Informations rendez-vous</Typography>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '8px 0' }} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Service</InputLabel>
              <Select
                value={appointment.service}
                onChange={handleServiceChange}
                label="Service"
              >
                {services.filter(s => !s.walkIn).map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    <Box display="flex" alignItems="center">
                      <Typography sx={{ ml: 1 }}>{service.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              value={appointment.date}
              onChange={(e) => setAppointment({...appointment, date: e.target.value})}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Heure de début"
              type="time"
              value={appointment.startTime}
              onChange={handleStartTimeChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Heure de fin"
              type="time"
              value={appointment.endTime}
              onChange={(e) => setAppointment({...appointment, endTime: e.target.value})}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Lieu</InputLabel>
              <Select
                value={appointment.location}
                onChange={(e) => setAppointment({...appointment, location: e.target.value})}
                label="Lieu"
              >
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="home">À domicile</MenuItem>
                <MenuItem value="outdoor">Extérieur</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select
                value={appointment.status}
                onChange={(e) => setAppointment({...appointment, status: e.target.value})}
                label="Statut"
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Statut de paiement</InputLabel>
              <Select
                value={appointment.paymentStatus}
                onChange={(e) => setAppointment({...appointment, paymentStatus: e.target.value})}
                label="Statut de paiement"
              >
                <MenuItem value="pending">En attente</MenuItem>
                <MenuItem value="paid">Payé</MenuItem>
                <MenuItem value="partial">Partiel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prix"
              type="number"
              value={appointment.price}
              onChange={(e) => setAppointment({...appointment, price: parseFloat(e.target.value) || 0})}
              InputProps={{ startAdornment: '€' }}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Notes"
              value={appointment.notes}
              onChange={(e) => setAppointment({...appointment, notes: e.target.value})}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Annuler
        </Button>
        <Button 
          onClick={onSubmit}
          variant="contained"
          color="primary"
        >
          {selectedAppointment ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;
