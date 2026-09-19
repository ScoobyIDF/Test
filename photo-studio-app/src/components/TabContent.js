import React from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardActions,
  Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Alert, Divider, Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Camera as CameraIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  PhotoCamera as PhotoCameraIcon,
  Group as GroupIcon,
  BabyChangingStation as BabyChangingStationIcon,
  ShoppingBasket as ShoppingBasketIcon
} from '@mui/icons-material';
import { format, parseISO, addHours } from 'date-fns';
import { fr } from 'date-fns/locale';

const TabContent = ({
  selectedTab,
  appointments,
  walkInClients,
  filteredAppointments,
  filteredWalkInClients,
  filterDate,
  filterStatus,
  filterService,
  setFilterDate,
  setFilterStatus,
  setFilterService,
  newAppointment,
  setNewAppointment,
  newWalkInClient,
  setNewWalkInClient,
  openAppointmentDialog,
  setOpenAppointmentDialog,
  openWalkInDialog,
  setOpenWalkInDialog,
  openStatsDialog,
  setOpenStatsDialog,
  openSettingsDialog,
  setOpenSettingsDialog,
  selectedAppointment,
  setSelectedAppointment,
  handleSelectAppointment,
  handleDeleteAppointment,
  handleAddAppointment,
  handleUpdateAppointment,
  handleAddWalkInClient,
  handleUpdateWalkInStatus,
  handleDeleteWalkInClient,
  getStats,
  getTodayRevenue,
  isStudioOpen,
  formatStudioHours,
  SERVICE_TYPES,
  APPOINTMENT_STATUSES,
  STUDIO_HOURS,
  generateDemoData,
  resetData
}) => {

  // Rendre les cartes de rendez-vous
  const renderAppointmentCards = () => {
    return filteredAppointments.map(appointment => {
      const service = SERVICE_TYPES.find(s => s.id === appointment.service);
      const status = APPOINTMENT_STATUSES.find(s => s.value === appointment.status);
      
      return (
        <Card key={appointment.id} sx={{ mb: 2, borderLeft: `4px solid ${service?.color || '#9E9E9E'}` }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" component="div">
                {service?.name || appointment.service}
              </Typography>
              <Chip 
                label={status?.label || appointment.status} 
                size="small" 
                sx={{ backgroundColor: status?.color || '#9E9E9E', color: 'white' }}
              />
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              <PersonIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              {appointment.client.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              {appointment.startTime} - {appointment.endTime}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <CalendarIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              {format(parseISO(appointment.date), 'EEEE d MMMM yyyy', { locale: fr })}
            </Typography>
            
            {appointment.notes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {appointment.notes}
              </Typography>
            )}
            
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="body2">
                <WorkIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                {appointment.location === 'studio' ? 'Studio' : appointment.location === 'home' ? 'À domicile' : 'Extérieur'}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {appointment.price} €
              </Typography>
            </Box>
          </CardContent>
          
          <CardActions>
            <Button 
              size="small" 
              startIcon={<CameraIcon />}
              onClick={() => handleSelectAppointment(appointment)}
            >
              Modifier
            </Button>
            <Button 
              size="small" 
              color="error"
              startIcon={<PhotoCameraIcon />}
              onClick={() => handleDeleteAppointment(appointment.id)}
            >
              Supprimer
            </Button>
            {appointment.status === 'confirmed' && (
              <Button 
                size="small" 
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  const updated = appointments.map(app => 
                    app.id === appointment.id ? { ...app, status: 'completed' } : app
                  );
                  // Cette logique sera gérée dans le composant parent
                  handleSelectAppointment({...appointment, status: 'completed'});
                  handleUpdateAppointment();
                }}
              >
                Terminé
              </Button>
            )}
          </CardActions>
        </Card>
      );
    });
  };

  // Rendre les cartes de clients sans rendez-vous
  const renderWalkInClientCards = () => {
    return filteredWalkInClients.map(client => {
      const service = SERVICE_TYPES.find(s => s.id === client.service) || { color: '#9E9E9E' };
      
      const getStatusLabel = (status) => {
        switch(status) {
          case 'in_progress': return 'En cours';
          case 'completed': return 'Terminé';
          case 'pending': return 'En attente';
          default: return status;
        }
      };

      const getStatusColor = (status) => {
        switch(status) {
          case 'completed': return 'success';
          case 'in_progress': return 'primary';
          default: return 'default';
        }
      };
      
      return (
        <Card key={client.id} sx={{ mb: 2, borderLeft: `4px solid ${service.color}` }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" component="div">
                <PhotoCameraIcon /> Photo d'identité
              </Typography>
              <Chip 
                label={getStatusLabel(client.status)} 
                size="small" 
                color={getStatusColor(client.status)}
              />
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              <PersonIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              {client.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              Arrivé à {client.arrivalTime}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <CalendarIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              {format(parseISO(client.arrivalDate), 'EEEE d MMMM yyyy', { locale: fr })}
            </Typography>
            
            {client.notes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {client.notes}
              </Typography>
            )}
            
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="body2">
                <PhotoCameraIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                {client.photosTaken} photos prises
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {client.price} €
              </Typography>
            </Box>
          </CardContent>
          
          <CardActions>
            <Button 
              size="small" 
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={() => handleUpdateWalkInStatus(client.id, 'completed')}
              disabled={client.status === 'completed'}
            >
              Terminé
            </Button>
            <Button 
              size="small" 
              color="error"
              startIcon={<PhotoCameraIcon />}
              onClick={() => handleDeleteWalkInClient(client.id)}
            >
              Supprimer
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  // Rendre le contenu en fonction de l'onglet sélectionné
  switch (selectedTab) {
    case 0: // Rendez-vous
      return (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight="bold">Rendez-vous</Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedAppointment(null);
                setNewAppointment({
                  id: '',
                  client: { id: '', name: '', phone: '', email: '', notes: '' },
                  service: '',
                  date: format(new Date(), 'yyyy-MM-dd'),
                  startTime: '09:00',
                  endTime: '10:00',
                  status: 'confirmed',
                  notes: '',
                  location: 'studio',
                  paymentStatus: 'pending',
                  price: 0
                });
                setOpenAppointmentDialog(true);
              }}
            >
              Nouveau rendez-vous
            </Button>
          </Box>
          
          {/* Filtres */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date"
                  type="date"
                  value={filterDate || ''}
                  onChange={(e) => setFilterDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Statut"
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    {APPOINTMENT_STATUSES.map((status) => (
                      <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Service</InputLabel>
                  <Select
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    label="Service"
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    {SERVICE_TYPES.filter(s => !s.walkIn).map((service) => (
                      <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Liste des rendez-vous */}
          {filteredAppointments.length > 0 ? (
            renderAppointmentCards()
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Aucun rendez-vous trouvé
              </Typography>
              {filterDate || filterStatus !== 'all' || filterService !== 'all' ? (
                <Button onClick={() => {
                  setFilterDate(null);
                  setFilterStatus('all');
                  setFilterService('all');
                }}>
                  Réinitialiser les filtres
                </Button>
              ) : null}
            </Paper>
          )}
        </Box>
      );

    case 1: // Clients sans rendez-vous
      return (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight="bold">Clients sans rendez-vous</Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => {
                setNewWalkInClient({
                  id: '',
                  name: '',
                  phone: '',
                  email: '',
                  service: 'id_photo',
                  arrivalTime: format(new Date(), 'HH:mm'),
                  status: 'in_progress',
                  notes: '',
                  paymentStatus: 'pending',
                  photosTaken: 0
                });
                setOpenWalkInDialog(true);
              }}
              disabled={!isStudioOpen()}
            >
              Nouveau client
            </Button>
          </Box>
          
          {!isStudioOpen() && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Le studio est actuellement fermé. Les clients sans rendez-vous ne peuvent pas être ajoutés.
            </Alert>
          )}
          
          {/* Filtre par date */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <TextField
              label="Date"
              type="date"
              value={filterDate || ''}
              onChange={(e) => setFilterDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Paper>
          
          {/* Liste des clients sans rendez-vous */}
          {filteredWalkInClients.length > 0 ? (
            renderWalkInClientCards()
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Aucun client sans rendez-vous trouvé
              </Typography>
              {filterDate && (
                <Button onClick={() => setFilterDate(null)}>
                  Réinitialiser le filtre
                </Button>
              )}
            </Paper>
          )}
        </Box>
      );

    case 2: // Aujourd'hui
      return (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Activité d'aujourd'hui - {format(new Date(), 'EEEE d MMMM yyyy', { locale: fr })}
          </Typography>
          
          {/* Statut du studio */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <HomeIcon color={isStudioOpen() ? 'success' : 'error'} sx={{ mr: 1, fontSize: '2rem' }} />
                  <Typography variant="h6">
                    {isStudioOpen() ? 'Studio OUVERT' : 'Studio FERMÉ'}
                  </Typography>
                </Box>
                <Chip 
                  label={isStudioOpen() ? 'Ouvert' : 'Fermé'} 
                  color={isStudioOpen() ? 'success' : 'error'}
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Horaires: {formatStudioHours(format(new Date(), 'EEEE', { locale: fr }).toLowerCase())}
              </Typography>
            </CardContent>
          </Card>
          
          {/* Statistiques du jour */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">Rendez-vous aujourd'hui</Typography>
                  <Typography variant="h4" fontWeight="bold">{getStats().todayAppointments}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">Clients sans rendez-vous</Typography>
                  <Typography variant="h4" fontWeight="bold">{getStats().todayWalkIns}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">Revenu du jour</Typography>
                  <Typography variant="h4" fontWeight="bold">{getTodayRevenue()} €</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">Total clients</Typography>
                  <Typography variant="h4" fontWeight="bold">{getStats().todayAppointments + getStats().todayWalkIns}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Rendez-vous d'aujourd'hui */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Rendez-vous d'aujourd'hui
          </Typography>
          
          {appointments.filter(app => app.date === format(new Date(), 'yyyy-MM-dd')).length > 0 ? (
            appointments
              .filter(app => app.date === format(new Date(), 'yyyy-MM-dd'))
              .sort((a, b) => new Date(`1970-01-01T${a.startTime}`) - new Date(`1970-01-01T${b.startTime}`))
              .map(appointment => {
                const service = SERVICE_TYPES.find(s => s.id === appointment.service);
                const status = APPOINTMENT_STATUSES.find(s => s.value === appointment.status);
                return (
                  <Card key={appointment.id} sx={{ mb: 2, borderLeft: `4px solid ${service?.color || '#9E9E9E'}` }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" component="div">{service?.name || appointment.service}</Typography>
                        <Chip label={status?.label || appointment.status} size="small" sx={{ backgroundColor: status?.color || '#9E9E9E', color: 'white' }} />
                      </Box>
                      <Typography variant="subtitle1" gutterBottom>
                        <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> {appointment.client.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> {appointment.startTime} - {appointment.endTime}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                        <Typography variant="body2"><WorkIcon fontSize="small" sx={{ mr: 0.5 }} /> {appointment.location}</Typography>
                        <Typography variant="body2" fontWeight="bold">{appointment.price} €</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<CameraIcon />} onClick={() => handleSelectAppointment(appointment)}>Modifier</Button>
                      <Button size="small" color="error" startIcon={<PhotoCameraIcon />} onClick={() => handleDeleteAppointment(appointment.id)}>Supprimer</Button>
                    </CardActions>
                  </Card>
                );
              })
          ) : (
            <Paper sx={{ p: 2, textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Aucun rendez-vous pour aujourd'hui</Typography>
            </Paper>
          )}
          
          {/* Clients sans rendez-vous d'aujourd'hui */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Clients sans rendez-vous aujourd'hui
          </Typography>
          
          {walkInClients.filter(client => client.arrivalDate === format(new Date(), 'yyyy-MM-dd')).length > 0 ? (
            walkInClients
              .filter(client => client.arrivalDate === format(new Date(), 'yyyy-MM-dd'))
              .sort((a, b) => new Date(`1970-01-01T${a.arrivalTime}`) - new Date(`1970-01-01T${b.arrivalTime}`))
              .map(client => {
                const service = SERVICE_TYPES.find(s => s.id === client.service) || { color: '#9E9E9E' };
                return (
                  <Card key={client.id} sx={{ mb: 2, borderLeft: `4px solid ${service.color}` }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" component="div"><PhotoCameraIcon /> Photo d'identité</Typography>
                        <Chip label={client.status === 'completed' ? 'Terminé' : 'En cours'} size="small" color={client.status === 'completed' ? 'success' : 'primary'} />
                      </Box>
                      <Typography variant="subtitle1" gutterBottom>
                        <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> {client.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> Arrivé à {client.arrivalTime}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                        <Typography variant="body2"><PhotoCameraIcon fontSize="small" sx={{ mr: 0.5 }} /> {client.photosTaken} photos</Typography>
                        <Typography variant="body2" fontWeight="bold">{client.price} €</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="success" startIcon={<CheckCircleIcon />} onClick={() => handleUpdateWalkInStatus(client.id, 'completed')} disabled={client.status === 'completed'}>Terminé</Button>
                      <Button size="small" color="error" startIcon={<PhotoCameraIcon />} onClick={() => handleDeleteWalkInClient(client.id)}>Supprimer</Button>
                    </CardActions>
                  </Card>
                );
              })
          ) : (
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Aucun client sans rendez-vous pour aujourd'hui</Typography>
            </Paper>
          )}
        </Box>
      );

    case 3: // Nouveau
      return (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ajouter un nouveau
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" py={4}>
                    <CalendarIcon sx={{ fontSize: '4rem', color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Rendez-vous
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Planifiez un nouveau rendez-vous pour un service en studio ou à l'extérieur
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setSelectedAppointment(null);
                        setNewAppointment({
                          id: '',
                          client: { id: '', name: '', phone: '', email: '', notes: '' },
                          service: '',
                          date: format(new Date(), 'yyyy-MM-dd'),
                          startTime: '09:00',
                          endTime: '10:00',
                          status: 'confirmed',
                          notes: '',
                          location: 'studio',
                          paymentStatus: 'pending',
                          price: 0
                        });
                        setOpenAppointmentDialog(true);
                      }}
                    >
                      Nouveau rendez-vous
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" py={4}>
                    <PersonIcon sx={{ fontSize: '4rem', color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Client sans rendez-vous
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Ajoutez un client qui arrive sans rendez-vous (photo d'identité)
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="success"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setNewWalkInClient({
                          id: '',
                          name: '',
                          phone: '',
                          email: '',
                          service: 'id_photo',
                          arrivalTime: format(new Date(), 'HH:mm'),
                          status: 'in_progress',
                          notes: '',
                          paymentStatus: 'pending',
                          photosTaken: 0
                        });
                        setOpenWalkInDialog(true);
                      }}
                      disabled={!isStudioOpen()}
                    >
                      Nouveau client
                    </Button>
                    {!isStudioOpen() && (
                      <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                        Studio fermé
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Services disponibles */}
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
            Nos services
          </Typography>
          
          <Grid container spacing={2}>
            {SERVICE_TYPES.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {service.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {service.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">
                        Durée: {service.duration} min
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {service.price} €
                      </Typography>
                    </Box>
                    {service.walkIn && (
                      <Chip label="Sans rendez-vous" size="small" color="success" sx={{ mt: 1 }} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      );

    default:
      return null;
  }
};

export default TabContent;
