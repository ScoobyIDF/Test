import React from 'react';
import {
  Card, CardContent, CardActions, Typography, Box, Chip, Button
} from '@mui/material';
import {
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
  Work as WorkIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const AppointmentCard = ({
  appointment,
  services,
  statuses,
  onEdit,
  onDelete,
  onComplete
}) => {
  const service = services.find(s => s.id === appointment.service);
  const status = statuses.find(s => s.value === appointment.status);
  
  return (
    <Card sx={{ mb: 2, borderLeft: `4px solid ${service?.color || '#9E9E9E'}` }}>
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
            <EditIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
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
          startIcon={<EditIcon />}
          onClick={() => onEdit(appointment)}
        >
          Modifier
        </Button>
        <Button 
          size="small" 
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(appointment.id)}
        >
          Supprimer
        </Button>
        {appointment.status === 'confirmed' && onComplete && (
          <Button 
            size="small" 
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => onComplete(appointment.id)}
          >
            Terminé
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default AppointmentCard;
