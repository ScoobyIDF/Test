import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, Card, CardContent, Typography, Paper, List, ListItem, ListItemText, Divider
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const StatsDialog = ({
  open,
  onClose,
  appointments,
  walkInClients,
  getStats,
  getDailyStats
}) => {
  const stats = getStats();
  const dailyStats = getDailyStats();
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Statistiques du studio</DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {/* Statistiques globales */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Statistiques globales</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Rendez-vous totaux</Typography>
                    <Typography variant="h4" fontWeight="bold">{stats.totalAppointments}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Clients sans rendez-vous</Typography>
                    <Typography variant="h4" fontWeight="bold">{stats.totalWalkIns}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Revenu total</Typography>
                    <Typography variant="h4" fontWeight="bold">{stats.totalRevenue} €</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Revenu aujourd'hui</Typography>
                    <Typography variant="h4" fontWeight="bold">{stats.todayRevenue} €</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Statistiques des rendez-vous */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Statut des rendez-vous</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Confirmés</Typography>
                    <Typography variant="h4" fontWeight="bold" color="success.main">{stats.confirmedAppointments}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Terminés</Typography>
                    <Typography variant="h4" fontWeight="bold" color="primary.main">{stats.completedAppointments}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">En attente</Typography>
                    <Typography variant="h4" fontWeight="bold" color="warning.main">{stats.pendingAppointments}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Statistiques par jour */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Activité par jour</Typography>
            <Paper sx={{ p: 2 }}>
              <List>
                {dailyStats.length > 0 ? (
                  dailyStats.map((dayStat) => (
                    <React.Fragment key={dayStat.date}>
                      <ListItem>
                        <ListItemText
                          primary={format(parseISO(dayStat.date), 'EEEE d MMMM yyyy', { locale: fr })}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                {dayStat.appointments} rendez-vous, {dayStat.walkIns} clients sans rendez-vous
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2" color="text.secondary">
                                Revenu: {dayStat.totalRevenue} €
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                    Aucune donnée disponible
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatsDialog;
