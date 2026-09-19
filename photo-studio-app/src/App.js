import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardActions,
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel, Chip, Avatar,
  List, ListItem, ListItemAvatar, ListItemText, Divider,
  Tabs, Tab, AppBar, Toolbar, IconButton, Badge,
  LinearProgress, Alert, Snackbar, Switch, FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Camera as CameraIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  ShoppingCart as ShoppingCartIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  PhotoCamera as PhotoCameraIcon,
  Group as GroupIcon,
  BabyChangingStation as BabyChangingStationIcon,
  ShoppingBasket as ShoppingBasketIcon
} from '@mui/icons-material';
import { format, parseISO, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';

// Import des composants et données
import { STUDIO_HOURS, SERVICE_TYPES, APPOINTMENT_STATUSES } from './data/studioData';
import AppointmentForm from './components/AppointmentForm';
import WalkInForm from './components/WalkInForm';
import AppointmentCard from './components/AppointmentCard';
import WalkInClientCard from './components/WalkInClientCard';
import StatsDialog from './components/StatsDialog';
import SettingsDialog from './components/SettingsDialog';
import AppBarComponent from './components/AppBarComponent';
import TabContent from './components/TabContent';

const App = () => {
  // États principaux
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [walkInClients, setWalkInClients] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  
  // États pour les dialogues
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);
  const [openWalkInDialog, setOpenWalkInDialog] = useState(false);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openStatsDialog, setOpenStatsDialog] = useState(false);
  
  // États pour les notifications
  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('info');
  
  // États pour les filtres
  const [filterDate, setFilterDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  
  // États pour le nouveau rendez-vous
  const [newAppointment, setNewAppointment] = useState({
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
  
  // États pour le nouveau client sans rendez-vous
  const [newWalkInClient, setNewWalkInClient] = useState({
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

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedAppointments = localStorage.getItem('studioAppointments');
    const savedWalkInClients = localStorage.getItem('studioWalkInClients');
    
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
    if (savedWalkInClients) {
      setWalkInClients(JSON.parse(savedWalkInClients));
    }
  }, []);

  // Sauvegarder les données dans localStorage
  useEffect(() => {
    localStorage.setItem('studioAppointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('studioWalkInClients', JSON.stringify(walkInClients));
  }, [walkInClients]);

  const addNotification = (message, severity = 'info') => {
    setNotifications(prev => [...prev, { id: uuidv4(), message, severity, timestamp: new Date() }]);
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  // Fonctions de gestion
  const handleAddAppointment = () => {
    const service = SERVICE_TYPES.find(s => s.id === newAppointment.service);
    if (!service) {
      addNotification('Veuillez sélectionner un service', 'error');
      return;
    }

    if (!newAppointment.client.name || !newAppointment.service || !newAppointment.date) {
      addNotification('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    const dayName = format(parseISO(newAppointment.date), 'EEEE', { locale: fr }).toLowerCase();
    const studioDay = STUDIO_HOURS[dayName];
    
    if (studioDay.closed) {
      addNotification(`Le studio est fermé le ${dayName}`, 'error');
      return;
    }

    const [startHour, startMinute] = newAppointment.startTime.split(':').map(Number);
    const [endHour, endMinute] = newAppointment.endTime.split(':').map(Number);
    
    let isValid = false;
    
    if (studioDay.split) {
      const inMorning = startHour >= studioDay.open[0] && endHour <= studioDay.close[0];
      const inAfternoon = startHour >= studioDay.open[1] && endHour <= studioDay.close[1];
      isValid = inMorning || inAfternoon;
    } else {
      isValid = startHour >= studioDay.open && endHour <= studioDay.close;
    }

    if (!isValid) {
      addNotification(`Horaire en dehors des heures d'ouverture du studio`, 'error');
      return;
    }

    const newAppDate = parseISO(`${newAppointment.date}T${newAppointment.startTime}`);
    const newAppEndDate = parseISO(`${newAppointment.date}T${newAppointment.endTime}`);
    
    const hasConflict = appointments.some(app => {
      const appDate = parseISO(`${app.date}T${app.startTime}`);
      const appEndDate = parseISO(`${app.date}T${app.endTime}`);
      return isSameDay(appDate, newAppDate) && 
             !(newAppEndDate <= appDate || newAppDate >= appEndDate);
    });

    if (hasConflict) {
      addNotification('Un autre rendez-vous existe déjà à cette heure', 'error');
      return;
    }

    const newApp = {
      ...newAppointment,
      id: uuidv4(),
      client: { ...newAppointment.client, id: uuidv4() },
      price: service.price,
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm')
    };

    setAppointments(prev => [...prev, newApp]);
    addNotification(`Rendez-vous ajouté: ${service.name} à ${newAppointment.startTime}`, 'success');
    
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
    
    setOpenAppointmentDialog(false);
  };

  const handleUpdateAppointment = () => {
    if (!selectedAppointment) return;

    const updatedAppointments = appointments.map(app => {
      if (app.id === selectedAppointment.id) {
        return selectedAppointment;
      }
      return app;
    });

    setAppointments(updatedAppointments);
    addNotification('Rendez-vous mis à jour', 'success');
    setSelectedAppointment(null);
    setOpenAppointmentDialog(false);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      setAppointments(prev => prev.filter(app => app.id !== id));
      addNotification('Rendez-vous supprimé', 'success');
    }
  };

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment({ ...appointment });
    setNewAppointment({ ...appointment });
    setOpenAppointmentDialog(true);
  };

  const handleAddWalkInClient = () => {
    if (!newWalkInClient.name) {
      addNotification('Veuillez entrer le nom du client', 'error');
      return;
    }

    const now = new Date();
    const dayName = format(now, 'EEEE', { locale: fr }).toLowerCase();
    const studioDay = STUDIO_HOURS[dayName];
    
    if (studioDay.closed) {
      addNotification(`Le studio est fermé aujourd'hui (${dayName})`, 'error');
      return;
    }

    const currentHour = now.getHours();
    let isOpen = false;
    
    if (studioDay.split) {
      const inMorning = currentHour >= studioDay.open[0] && currentHour < studioDay.close[0];
      const inAfternoon = currentHour >= studioDay.open[1] && currentHour < studioDay.close[1];
      isOpen = inMorning || inAfternoon;
    } else {
      isOpen = currentHour >= studioDay.open && currentHour < studioDay.close;
    }

    if (!isOpen) {
      addNotification(`Le studio est actuellement fermé`, 'error');
      return;
    }

    const service = SERVICE_TYPES.find(s => s.id === newWalkInClient.service);
    
    const newClient = {
      ...newWalkInClient,
      id: uuidv4(),
      arrivalTime: format(now, 'HH:mm'),
      arrivalDate: format(now, 'yyyy-MM-dd'),
      serviceName: service?.name || newWalkInClient.service,
      price: service?.price || 0,
      status: 'in_progress',
      createdAt: format(now, 'yyyy-MM-dd HH:mm')
    };

    setWalkInClients(prev => [...prev, newClient]);
    addNotification(`Nouveau client sans rendez-vous: ${newClient.name} pour ${service?.name || newWalkInClient.service}`, 'success');
    
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
    
    setOpenWalkInDialog(false);
  };

  const handleUpdateWalkInStatus = (id, status) => {
    setWalkInClients(prev => prev.map(client => {
      if (client.id === id) {
        return { ...client, status };
      }
      return client;
    }));
    addNotification(`Statut mis à jour pour le client`, 'success');
  };

  const handleDeleteWalkInClient = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setWalkInClients(prev => prev.filter(client => client.id !== id));
      addNotification('Client supprimé', 'success');
    }
  };

  const getDailyStats = () => {
    const stats = {};
    
    appointments.forEach(app => {
      const date = app.date;
      if (!stats[date]) {
        stats[date] = { date, appointments: 0, walkIns: 0, totalRevenue: 0 };
      }
      stats[date].appointments += 1;
      stats[date].totalRevenue += app.price || 0;
    });

    walkInClients.forEach(client => {
      const date = client.arrivalDate;
      if (!stats[date]) {
        stats[date] = { date, appointments: 0, walkIns: 0, totalRevenue: 0 };
      }
      stats[date].walkIns += 1;
      stats[date].totalRevenue += client.price || 0;
    });

    return Object.values(stats).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getTodayRevenue = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const todayAppointments = appointments.filter(app => app.date === today && app.status === 'completed');
    const todayWalkIns = walkInClients.filter(client => client.arrivalDate === today && client.status === 'completed');
    
    const appointmentRevenue = todayAppointments.reduce((sum, app) => sum + (app.price || 0), 0);
    const walkInRevenue = todayWalkIns.reduce((sum, client) => sum + (client.price || 0), 0);
    
    return appointmentRevenue + walkInRevenue;
  };

  const getStats = () => {
    const totalAppointments = appointments.length;
    const totalWalkIns = walkInClients.length;
    const totalRevenue = appointments.reduce((sum, app) => sum + (app.price || 0), 0) + 
                        walkInClients.reduce((sum, client) => sum + (client.price || 0), 0);
    
    const completedAppointments = appointments.filter(app => app.status === 'completed').length;
    const pendingAppointments = appointments.filter(app => app.status === 'pending').length;
    const confirmedAppointments = appointments.filter(app => app.status === 'confirmed').length;
    
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayAppointments = appointments.filter(app => app.date === today).length;
    const todayWalkIns = walkInClients.filter(client => client.arrivalDate === today).length;
    
    return {
      totalAppointments,
      totalWalkIns,
      totalRevenue,
      completedAppointments,
      pendingAppointments,
      confirmedAppointments,
      todayAppointments,
      todayWalkIns,
      todayRevenue: getTodayRevenue()
    };
  };

  const generateDemoData = () => {
    const services = ['family', 'baby', 'model', 'product', 'home_visit', 'outdoor'];
    const demoAppointments = [];
    const demoWalkIns = [];
    
    for (let i = 0; i < 7; i++) {
      const date = format(addDays(new Date(), -i), 'yyyy-MM-dd');
      const dayName = format(addDays(new Date(), -i), 'EEEE', { locale: fr }).toLowerCase();
      const studioDay = STUDIO_HOURS[dayName];
      
      if (studioDay.closed) continue;

      const numAppointments = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < numAppointments; j++) {
        let startHour, endHour;
        
        if (studioDay.split) {
          const useMorning = Math.random() > 0.5;
          if (useMorning) {
            startHour = Math.floor(Math.random() * (studioDay.close[0] - studioDay.open[0] - 1)) + studioDay.open[0];
            endHour = startHour + 1;
          } else {
            startHour = Math.floor(Math.random() * (studioDay.close[1] - studioDay.open[1] - 1)) + studioDay.open[1];
            endHour = startHour + 1;
          }
        } else {
          startHour = Math.floor(Math.random() * (studioDay.close - studioDay.open - 1)) + studioDay.open;
          endHour = startHour + 1;
        }

        const service = services[Math.floor(Math.random() * services.length)];
        const serviceObj = SERVICE_TYPES.find(s => s.id === service);
        
        demoAppointments.push({
          id: uuidv4(),
          client: {
            id: uuidv4(),
            name: `Client ${Math.floor(Math.random() * 100) + 1}`,
            phone: `06${Math.floor(Math.random() * 100000000 + 10000000)}`,
            email: `client${Math.floor(Math.random() * 100) + 1}@example.com`,
            notes: ''
          },
          service: service,
          date: date,
          startTime: `${startHour.toString().padStart(2, '0')}:00`,
          endTime: `${endHour.toString().padStart(2, '0')}:00`,
          status: ['confirmed', 'completed', 'pending'][Math.floor(Math.random() * 3)],
          notes: '',
          location: Math.random() > 0.7 ? 'home' : 'studio',
          paymentStatus: ['pending', 'paid', 'partial'][Math.floor(Math.random() * 3)],
          price: serviceObj?.price || 0,
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm')
        });
      }

      const numWalkIns = Math.floor(Math.random() * 5);
      for (let k = 0; k < numWalkIns; k++) {
        const hour = Math.floor(Math.random() * (studioDay.close - studioDay.open)) + studioDay.open;
        
        demoWalkIns.push({
          id: uuidv4(),
          name: `Client Walk-In ${Math.floor(Math.random() * 100) + 1}`,
          phone: `06${Math.floor(Math.random() * 100000000 + 10000000)}`,
          email: `walkin${Math.floor(Math.random() * 100) + 1}@example.com`,
          service: 'id_photo',
          serviceName: 'Photo d\'identité',
          arrivalDate: date,
          arrivalTime: `${hour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          status: ['completed', 'in_progress', 'pending'][Math.floor(Math.random() * 3)],
          notes: '',
          paymentStatus: ['pending', 'paid'][Math.floor(Math.random() * 2)],
          photosTaken: Math.floor(Math.random() * 10) + 1,
          price: 15,
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm')
        });
      }
    }

    setAppointments(demoAppointments);
    setWalkInClients(demoWalkIns);
    addNotification('Données de démonstration générées', 'success');
  };

  const resetData = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les données ?')) {
      setAppointments([]);
      setWalkInClients([]);
      localStorage.removeItem('studioAppointments');
      localStorage.removeItem('studioWalkInClients');
      addNotification('Toutes les données ont été supprimées', 'success');
    }
  };

  const formatStudioHours = (dayName) => {
    const day = STUDIO_HOURS[dayName];
    if (day.closed) return 'Fermé';
    
    if (day.split) {
      return `${day.open[0]}h-${day.close[0]}h / ${day.open[1]}h-${day.close[1]}h`;
    }
    
    return `${day.open}h-${day.close}h`;
  };

  const isStudioOpen = () => {
    const now = new Date();
    const dayName = format(now, 'EEEE', { locale: fr }).toLowerCase();
    const studioDay = STUDIO_HOURS[dayName];
    
    if (studioDay.closed) return false;
    
    const currentHour = now.getHours();
    
    if (studioDay.split) {
      const inMorning = currentHour > studioDay.open[0] && currentHour < studioDay.close[0];
      const inAfternoon = currentHour >= studioDay.open[1] && currentHour < studioDay.close[1];
      return inMorning || inAfternoon;
    }
    
    return currentHour >= studioDay.open && currentHour < studioDay.close;
  };

  // Filtrer les rendez-vous
  const filteredAppointments = appointments.filter(app => {
    if (filterDate && app.date !== filterDate) return false;
    if (filterStatus !== 'all' && app.status !== filterStatus) return false;
    if (filterService !== 'all' && app.service !== filterService) return false;
    return true;
  });

  // Filtrer les clients sans rendez-vous
  const filteredWalkInClients = walkInClients.filter(client => {
    if (filterDate && client.arrivalDate !== filterDate) return false;
    return true;
  });

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBarComponent 
        notifications={notifications}
        setOpenStatsDialog={setOpenStatsDialog}
        setOpenSettingsDialog={setOpenSettingsDialog}
        setOpenNotification={setOpenNotification}
      />
      
      <Box sx={{ pt: 8, pb: 2 }}>
        <Box sx={{ 
          width: '100%', 
          maxWidth: 'lg',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 }
        }}>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} centered>
            <Tab icon={<CalendarIcon />} label="Rendez-vous" />
            <Tab icon={<PersonIcon />} label="Clients sans rendez-vous" />
            <Tab icon={<AccessTimeIcon />} label="Aujourd'hui" />
            <Tab icon={<CameraIcon />} label="Nouveau" />
          </Tabs>
          
          <Box sx={{ mt: 3 }}>
            <TabContent
              selectedTab={selectedTab}
              appointments={appointments}
              walkInClients={walkInClients}
              filteredAppointments={filteredAppointments}
              filteredWalkInClients={filteredWalkInClients}
              filterDate={filterDate}
              filterStatus={filterStatus}
              filterService={filterService}
              setFilterDate={setFilterDate}
              setFilterStatus={setFilterStatus}
              setFilterService={setFilterService}
              newAppointment={newAppointment}
              setNewAppointment={setNewAppointment}
              newWalkInClient={newWalkInClient}
              setNewWalkInClient={setNewWalkInClient}
              openAppointmentDialog={openAppointmentDialog}
              setOpenAppointmentDialog={setOpenAppointmentDialog}
              openWalkInDialog={openWalkInDialog}
              setOpenWalkInDialog={setOpenWalkInDialog}
              openStatsDialog={openStatsDialog}
              setOpenStatsDialog={setOpenStatsDialog}
              openSettingsDialog={openSettingsDialog}
              setOpenSettingsDialog={setOpenSettingsDialog}
              selectedAppointment={selectedAppointment}
              handleSelectAppointment={handleSelectAppointment}
              handleDeleteAppointment={handleDeleteAppointment}
              handleAddAppointment={handleAddAppointment}
              handleUpdateAppointment={handleUpdateAppointment}
              handleAddWalkInClient={handleAddWalkInClient}
              handleUpdateWalkInStatus={handleUpdateWalkInStatus}
              handleDeleteWalkInClient={handleDeleteWalkInClient}
              getStats={getStats}
              getTodayRevenue={getTodayRevenue}
              isStudioOpen={isStudioOpen}
              formatStudioHours={formatStudioHours}
              SERVICE_TYPES={SERVICE_TYPES}
              APPOINTMENT_STATUSES={APPOINTMENT_STATUSES}
              STUDIO_HOURS={STUDIO_HOURS}
              generateDemoData={generateDemoData}
              resetData={resetData}
            />
          </Box>
        </Box>
      </Box>

      {/* Dialogues */}
      <AppointmentForm
        open={openAppointmentDialog}
        onClose={() => {
          setOpenAppointmentDialog(false);
          setSelectedAppointment(null);
        }}
        appointment={newAppointment}
        setAppointment={setNewAppointment}
        services={SERVICE_TYPES}
        statuses={APPOINTMENT_STATUSES}
        studioHours={STUDIO_HOURS}
        onSubmit={selectedAppointment ? handleUpdateAppointment : handleAddAppointment}
        selectedAppointment={selectedAppointment}
      />

      <WalkInForm
        open={openWalkInDialog}
        onClose={() => setOpenWalkInDialog(false)}
        client={newWalkInClient}
        setClient={setNewWalkInClient}
        services={SERVICE_TYPES}
        onSubmit={handleAddWalkInClient}
      />

      <StatsDialog
        open={openStatsDialog}
        onClose={() => setOpenStatsDialog(false)}
        appointments={appointments}
        walkInClients={walkInClients}
        getStats={getStats}
        getDailyStats={getDailyStats}
      />

      <SettingsDialog
        open={openSettingsDialog}
        onClose={() => setOpenSettingsDialog(false)}
        studioHours={STUDIO_HOURS}
        formatStudioHours={formatStudioHours}
        generateDemoData={generateDemoData}
        resetData={resetData}
      />

      {/* Notification */}
      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notificationSeverity} sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
