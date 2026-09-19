import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, TextField, FormControl, InputLabel, Select, MenuItem,
  Button, Box, Typography
} from '@mui/material';
import { format } from 'date-fns';

const WalkInForm = ({
  open,
  onClose,
  client,
  setClient,
  services,
  onSubmit
}) => {
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nouveau client sans rendez-vous</DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Nom du client"
              value={client.name}
              onChange={(e) => setClient({...client, name: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Téléphone"
              value={client.phone}
              onChange={(e) => setClient({...client, phone: e.target.value})}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              value={client.email}
              onChange={(e) => setClient({...client, email: e.target.value})}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Service</InputLabel>
              <Select
                value={client.service}
                onChange={(e) => setClient({...client, service: e.target.value})}
                label="Service"
              >
                {services.filter(s => s.walkIn).map((service) => (
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
              label="Heure d'arrivée"
              type="time"
              value={client.arrivalTime}
              onChange={(e) => setClient({...client, arrivalTime: e.target.value})}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre de photos"
              type="number"
              value={client.photosTaken}
              onChange={(e) => setClient({...client, photosTaken: parseInt(e.target.value) || 0})}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Statut de paiement</InputLabel>
              <Select
                value={client.paymentStatus}
                onChange={(e) => setClient({...client, paymentStatus: e.target.value})}
                label="Statut de paiement"
              >
                <MenuItem value="pending">En attente</MenuItem>
                <MenuItem value="paid">Payé</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Notes"
              value={client.notes}
              onChange={(e) => setClient({...client, notes: e.target.value})}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalkInForm;
