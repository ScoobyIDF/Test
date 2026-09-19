import React from 'react';
import {
  Card, CardContent, CardActions, Typography, Box, Chip, Button
} from '@mui/material';
import {
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const WalkInClientCard = ({
  client,
  services,
  onUpdateStatus,
  onDelete
}) => {
  const service = services.find(s => s.id === client.service) || { color: '#9E9E9E' };
  
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
    <Card sx={{ mb: 2, borderLeft: `4px solid ${service.color}` }}>
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
            <EditIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
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
          onClick={() => onUpdateStatus(client.id, 'completed')}
          disabled={client.status === 'completed'}
        >
          Terminé
        </Button>
        <Button 
          size="small" 
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(client.id)}
        >
          Supprimer
        </Button>
      </CardActions>
    </Card>
  );
};

export default WalkInClientCard;
