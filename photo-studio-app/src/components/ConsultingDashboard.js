import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardHeader,
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
  Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Star as StarIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Euro as EuroIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import {
  PROFITABILITY_ANALYSIS,
  LOW_VALUE_TASKS,
  OPTIMIZED_WEEKLY_SCHEDULE,
  BUSINESS_MODELS,
  TIME_DISTRIBUTION,
  BATCHING_SYSTEM,
  WARNING_POINTS,
  STANDARD_PROCEDURES
} from '../data/consultingData';

const ConsultingDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedModel, setSelectedModel] = useState('model_5k');
  const [openProcedureDialog, setOpenProcedureDialog] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  // Calcul du CA total par service
  const totalMonthlyRevenue = PROFITABILITY_ANALYSIS.services.reduce(
    (sum, service) => sum + service.monthlyRevenue, 0
  );

  // Top 3 services les plus rentables
  const topServices = [...PROFITABILITY_ANALYSIS.services]
    .sort((a, b) => b.hourlyRate - a.hourlyRate)
    .slice(0, 3);

  // Temps total économisé avec optimisations
  const totalTimeSaved = LOW_VALUE_TASKS.reduce(
    (sum, task) => sum + task.timeSaved, 0
  );

  // Revenu potentiel par modèle
  const selectedBusinessModel = BUSINESS_MODELS[selectedModel];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProcedureClick = (procedure) => {
    setSelectedProcedure(procedure);
    setOpenProcedureDialog(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      5: '#FFD700', // Or
      4: '#4169E1', // Bleu
      3: '#FF8C00', // Orange
      2: '#9932CC', // Violet
      1: '#808080'  // Gris
    };
    return colors[priority] || '#808080';
  };

  const renderProfitabilityAnalysis = () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Analyse de Rentabilité par Service
      </Typography>
      
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardHeader
              title="Chiffre d'Affaires Total Mensuel"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              avatar={<EuroIcon color="primary" />}
            />
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {formatCurrency(totalMonthlyRevenue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Basé sur {PROFITABILITY_ANALYSIS.services.length} services actifs
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(totalMonthlyRevenue / 10000) * 100}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                Objectif 10K€ : {(totalMonthlyRevenue / 10000 * 100).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardHeader
              title="Services les Plus Rentables"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              avatar={<TrendingUpIcon color="success" />}
            />
            <CardContent>
              {topServices.map((service, index) => (
                <Box key={service.id} display="flex" alignItems="center" mb={1}>
                  <Chip 
                    label={index + 1}
                    size="small" 
                    color="primary"
                    sx={{ mr: 1, fontWeight: 'bold' }}
                  />
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    {formatCurrency(service.hourlyRate)}/h
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardHeader
              title="Répartition par Catégorie"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              avatar={<ScheduleIcon color="info" />}
            />
            <CardContent>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center">
                  <Box width="100%" bgcolor="#e3f2fd" height={8} borderRadius={1} mr={1}>
                    <Box width="60%" bgcolor="#2196f3" height="100%" borderRadius={1}></Box>
                  </Box>
                  <Typography variant="body2">Rendez-vous (60%)</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box width="100%" bgcolor="#e8f5e9" height={8} borderRadius={1} mr={1}>
                    <Box width="40%" bgcolor="#4caf50" height="100%" borderRadius={1}></Box>
                  </Box>
                  <Typography variant="body2">Walk-in (40%)</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tableau complet des services */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Détail de Tous les Services
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Service</strong></TableCell>
                <TableCell><strong>Catégorie</strong></TableCell>
                <TableCell><strong>Prix Moyen</strong></TableCell>
                <TableCell><strong>Durée</strong></TableCell>
                <TableCell><strong>Marge</strong></TableCell>
                <TableCell><strong>Revenu/H</strong></TableCell>
                <TableCell><strong>Priorité</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PROFITABILITY_ANALYSIS.services.map((service) => (
                <TableRow key={service.id} hover>
                  <TableCell>
                    <Chip 
                      label={service.name} 
                      size="small"
                      sx={{ bgcolor: service.color, color: 'white' }}
                    />
                  </TableCell>
                  <TableCell>{service.category === 'walkin' ? 'Sans RDV' : 'Sur RDV'}</TableCell>
                  <TableCell>{formatCurrency(service.avgPrice)}</TableCell>
                  <TableCell>{service.duration} min</TableCell>
                  <TableCell>{(service.margin * 100).toFixed(0)}%</TableCell>
                  <TableCell fontWeight="bold" color="success.main">
                    {formatCurrency(service.hourlyRate)}
                  </TableCell>
                  <TableCell>
                    {[...Array(service.priority)].map((_, i) => (
                      <StarIcon key={i} color="warning" fontSize="small" />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );

  const renderTimeOptimization = () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Optimisation du Temps & Tâches à Faible Valeur Ajoutée
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardHeader
              title="Temps Total Économisable"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              avatar={<TimerIcon color="primary" />}
            />
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {totalTimeSaved.toFixed(1)}h/semaine
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Soit {((totalTimeSaved / 40) * 100).toFixed(1)}% de temps en plus
              </Typography>
              <Typography variant="body2" color="success.main" mt={1}>
                ≡ {formatCurrency(totalTimeSaved * 50)} de valeur ajoutée
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardHeader
              title="Tâches les Plus Chronophages"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              avatar={<WarningIcon color="warning" />}
            />
            <CardContent>
              {LOW_VALUE_TASKS
                .sort((a, b) => b.timePerWeek - a.timePerWeek)
                .slice(0, 3)
                .map((task) => (
                  <Box key={task.id} display="flex" alignItems="center" mb={1}>
                    <Chip 
                      label={task.timePerWeek + 'h'}
                      size="small" 
                      color="error"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {task.name}
                    </Typography>
                    <Chip 
                      label={task.valueAdded + '/5'}
                      size="small" 
                      color="default"
                    />
                  </Box>
                ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardHeader
              title="Système de Batching"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              avatar={<ScheduleIcon color="info" />}
            />
            <CardContent>
              <Box display="flex" flexDirection="column" gap={1}>
                {Object.entries(BATCHING_SYSTEM).map(([key, batch]) => (
                  <Accordion key={key} elevation={0} sx={{ bgcolor: 'background.paper' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="body2" fontWeight="bold">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption">
                        Créneaux : {batch.timeSlots.join(', ')}
                      </Typography>
                      <Typography variant="caption" color="success.main">
                        Temps économisé : {batch.timeSaved}h/semaine
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tableau des tâches */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Toutes les Tâches à Optimiser
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Tâche</strong></TableCell>
                <TableCell><strong>Temps/Semaine</strong></TableCell>
                <TableCell><strong>Valeur Ajoutée</strong></TableCell>
                <TableCell><strong>Automatisable ?</strong></TableCell>
                <TableCell><strong>Solution</strong></TableCell>
                <TableCell><strong>Temps Sauvé</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LOW_VALUE_TASKS.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.timePerWeek}h</TableCell>
                  <TableCell>
                    {[...Array(task.valueAdded)].map((_, i) => (
                      <StarIcon key={i} color="warning" fontSize="small" />
                    ))}
                  </TableCell>
                  <TableCell>
                    {task.automatable ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <TrendingDownIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={task.solution} size="small" />
                  </TableCell>
                  <TableCell color="success.main" fontWeight="bold">
                    +{task.timeSaved}h
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );

  const renderWeeklySchedule = () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Planning Hebdomadaire Optimisé
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Jour</strong></TableCell>
                <TableCell><strong>9h-12h</strong></TableCell>
                <TableCell><strong>12h-14h</strong></TableCell>
                <TableCell><strong>14h-17h</strong></TableCell>
                <TableCell><strong>17h-19h</strong></TableCell>
                <TableCell><strong>Revenu/Jour</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(OPTIMIZED_WEEKLY_SCHEDULE).map(([day, schedule]) => {
                if (schedule.closed) {
                  return (
                    <TableRow key={day}>
                      <TableCell>
                        <Chip label={day.charAt(0).toUpperCase() + day.slice(1)} color="default" />
                      </TableCell>
                      <TableCell colSpan={5} align="center" color="text.secondary">
                        Fermé
                      </TableCell>
                    </TableRow>
                  );
                }
                
                const dailyRevenue = (
                  (schedule.morning ? schedule.morning.revenue : 0) +
                  (schedule.afternoon ? schedule.afternoon.revenue : 0) +
                  (schedule.evening ? schedule.evening.revenue : 0)
                );

                return (
                  <TableRow key={day} hover>
                    <TableCell>
                      <Chip 
                        label={day.charAt(0).toUpperCase() + day.slice(1)} 
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      {schedule.morning && (
                        <Chip 
                          label={schedule.morning.activity}
                          size="small"
                          sx={{ bgcolor: schedule.morning.color, color: 'white' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip label="Pause Déjeuner" size="small" color="default" />
                    </TableCell>
                    <TableCell>
                      {schedule.afternoon && (
                        <Chip 
                          label={schedule.afternoon.activity}
                          size="small"
                          sx={{ bgcolor: schedule.afternoon.color, color: 'white' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {schedule.evening && (
                        <Chip 
                          label={schedule.evening.activity}
                          size="small"
                          sx={{ bgcolor: schedule.evening.color, color: 'white' }}
                        />
                      )}
                    </TableCell>
                    <TableCell fontWeight="bold" color="success.main">
                      {formatCurrency(dailyRevenue)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Légende */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Légende des Activités
        </Typography>
        <Grid container spacing={2}>
          {Object.values(OPTIMIZED_WEEKLY_SCHEDULE)
            .flatMap(day => [day.morning, day.afternoon, day.evening])
            .filter(Boolean)
            .reduce((acc, slot) => {
              if (!acc.find(s => s.activity === slot.activity)) {
                acc.push(slot);
              }
              return acc;
            }, [])
            .map((slot, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box display="flex" alignItems="center">
                  <Box 
                    width={20} 
                    height={20} 
                    bgcolor={slot.color} 
                    borderRadius="50%" 
                    mr={1}
                  />
                  <Typography variant="body2">{slot.activity}</Typography>
                  <Chip 
                    label={formatCurrency(slot.revenue) + '/jour'}
                    size="small"
                    color="success"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Paper>

      {/* Répartition du temps */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Répartition du Temps par Activité
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(TIME_DISTRIBUTION).map(([key, data]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card elevation={1}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {data.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={data.percentage}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    color={data.revenuePerHour > 0 ? 'success' : 'error'}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {data.hoursPerWeek}h/semaine
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {data.revenuePerHour > 0 ? 
                      `${formatCurrency(data.revenuePerHour)}/h` : 
                      'Coût administratif'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );

  const renderBusinessModels = () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Modèles Économiques pour Objectifs de CA
      </Typography>

      <Grid container spacing={3} mb={4}>
        {Object.entries(BUSINESS_MODELS).map(([key, model]) => (
          <Grid item xs={12} md={6} lg={3} key={key}>
            <Card 
              elevation={3}
              onClick={() => setSelectedModel(key)}
              sx={{ 
                cursor: 'pointer',
                border: selectedModel === key ? '2px solid #1976d2' : 'none',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 }
              }}
            >
              <CardHeader
                title={model.name}
                titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                avatar={
                  <Box 
                    width={40} 
                    height={40} 
                    bgcolor={model.color} 
                    borderRadius="50%" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                  >
                    <EuroIcon fontSize="small" sx={{ color: 'white' }} />
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {formatCurrency(model.target)}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Photos ID/Jour:</Typography>
                  <Typography variant="body2" fontWeight="bold">{model.idPhotosPerDay}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Rendez-vous/Semaine:</Typography>
                  <Typography variant="body2" fontWeight="bold">{model.appointmentsPerWeek}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Déplacements/Semaine:</Typography>
                  <Typography variant="body2" fontWeight="bold">{model.externalShootsPerWeek}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Temps: {model.estimatedTime}h
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold">
                  Marge nette: {formatCurrency(model.netMargin)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Détails du modèle sélectionné */}
      {selectedBusinessModel && (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Détail du Modèle : {selectedBusinessModel.name}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="Répartition des Activités" />
                <CardContent>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center">
                      <Box width="100%" bgcolor="#e3f2fd" height={10} borderRadius={1} mr={2}>
                        <Box 
                          width={((selectedBusinessModel.idPhotosPerDay * 10) / 40 * 100) + '%'} 
                          bgcolor="#2196f3" 
                          height="100%" 
                          borderRadius={1}
                        ></Box>
                      </Box>
                      <Typography variant="body2">
                        Photos ID: {selectedBusinessModel.idPhotosPerDay}/jour
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box width="100%" bgcolor="#e8f5e9" height={10} borderRadius={1} mr={2}>
                        <Box 
                          width={((selectedBusinessModel.appointmentsPerWeek * 2.5) / 40 * 100) + '%'} 
                          bgcolor="#4caf50" 
                          height="100%" 
                          borderRadius={1}
                        ></Box>
                      </Box>
                      <Typography variant="body2">
                        Rendez-vous: {selectedBusinessModel.appointmentsPerWeek}/semaine
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box width="100%" bgcolor="#fff3e0" height={10} borderRadius={1} mr={2}>
                        <Box 
                          width={((selectedBusinessModel.externalShootsPerWeek * 6) / 40 * 100) + '%'} 
                          bgcolor="#ff9800" 
                          height="100%" 
                          borderRadius={1}
                        ></Box>
                      </Box>
                      <Typography variant="body2">
                        Déplacements: {selectedBusinessModel.externalShootsPerWeek}/semaine
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="Indicateurs Clés" />
                <CardContent>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">CA Brut Estimé:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatCurrency(selectedBusinessModel.estimatedRevenue)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Temps Total:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {selectedBusinessModel.estimatedTime}h/semaine
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Marge Nette:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {formatCurrency(selectedBusinessModel.netMargin)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Rentabilité:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {((selectedBusinessModel.netMargin / selectedBusinessModel.estimatedRevenue) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );

  const renderProcedures = () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Procédures Standardisées
      </Typography>

      <Grid container spacing={3} mb={4}>
        {Object.entries(STANDARD_PROCEDURES).map(([key, procedure]) => (
          <Grid item xs={12} md={6} lg={4} key={key}>
            <Card 
              elevation={3}
              onClick={() => handleProcedureClick(procedure)}
              sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
            >
              <CardHeader
                title={procedure.name}
                titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                avatar={<TimerIcon color="primary" />}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Temps total: {procedure.totalTime || 'Variable'} min
                </Typography>
                {procedure.presets && (
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      Presets disponibles ({procedure.presets.length}):
                    </Typography>
                    {procedure.presets.map((preset, i) => (
                      <Chip 
                        key={i} 
                        label={preset.name}
                        size="small"
                        sx={{ mr: 1, mt: 1, bgcolor: '#e3f2fd' }}
                      />
                    ))}
                  </Box>
                )}
                {procedure.checklist && (
                  <Box mt={2}>
                    <Typography variant="body2" fontWeight="bold">
                      Checklist: {procedure.checklist.length} étapes
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialogue des détails de procédure */}
      <Dialog 
        open={openProcedureDialog} 
        onClose={() => setOpenProcedureDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedProcedure?.name}
          <Chip 
            label={`Temps: ${selectedProcedure?.totalTime || 'Variable'} min`}
            size="small"
            color="primary"
            sx={{ ml: 2 }}
          />
        </DialogTitle>
        <DialogContent dividers>
          {selectedProcedure?.steps && (
            <Box mb={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Étapes :
              </Typography>
              {selectedProcedure.steps.map((step, index) => (
                <Box 
                  key={index} 
                  display="flex" 
                  alignItems="center" 
                  mb={1} 
                  p={1} 
                  bgcolor={index % 2 === 0 ? '#f5f5f5' : 'transparent'}
                  borderRadius={1}
                >
                  <Chip 
                    label={step.step}
                    size="small" 
                    color="primary"
                    sx={{ mr: 2, minWidth: 30 }}
                  />
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {step.action}
                  </Typography>
                  <Chip 
                    label={`${step.time} min`}
                    size="small" 
                    color="success"
                  />
                </Box>
              ))}
            </Box>
          )}
          
          {selectedProcedure?.checklist && (
            <Box mb={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Checklist :
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {selectedProcedure.checklist.map((item, index) => (
                  <Box 
                    key={index} 
                    component="li" 
                    display="flex" 
                    alignItems="center" 
                    mb={0.5}
                  >
                    <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          
          {selectedProcedure?.presets && (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Presets Disponibles :
              </Typography>
              {selectedProcedure.presets.map((preset, index) => (
                <Card key={index} elevation={1} sx={{ mb: 1, p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight="bold">
                      {preset.name}
                    </Typography>
                    <Chip 
                      label={`Gain: ${preset.timeSaved} min`}
                      size="small" 
                      color="success"
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {preset.description}
                  </Typography>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProcedureDialog(false)} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const renderWarnings = () => (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Points de Vigilance & Erreurs à Éviter
      </Typography>

      <Grid container spacing={3} mb={4}>
        {WARNING_POINTS.map((warning) => (
          <Grid item xs={12} md={6} lg={4} key={warning.id}>
            <Card 
              elevation={3}
              sx={{ 
                borderLeft: `4px solid ${warning.color}`,
                borderRadius: 0
              }}
            >
              <CardHeader
                title={warning.title}
                titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                avatar={
                  warning.severity === 'high' ? (
                    <WarningIcon color="error" />
                  ) : (
                    <WarningIcon color="warning" />
                  )
                }
              />
              <CardContent>
                <Typography variant="body2">
                  {warning.description}
                </Typography>
                <Chip 
                  label={warning.severity === 'high' ? 'CRITIQUE' : 'IMPORTANT'}
                  size="small"
                  color={warning.severity === 'high' ? 'error' : 'warning'}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Checklist des "À Ne Pas Oublier"
        </Typography>
        
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Avant chaque rendez-vous */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              ⏰ Avant chaque Rendez-vous :
            </Typography>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {[
                'Contrat signé et dépôt reçu (50%)',
                'Matériel vérifié (batteries, cartes mémoire, éclairages)',
                'Studio nettoyé et prêt',
                'Playlist musicale préparée',
                'Eau/café proposé au client'
              ].map((item, index) => (
                <Box key={index} component="li" display="flex" alignItems="center" mb={0.5}>
                  <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Après chaque rendez-vous */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              ✅ Après chaque Rendez-vous :
            </Typography>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {[
                'Photos sauvegardées (2x : disque dur + cloud)',
                'Solde du client noté',
                'Feedback demandé (Google Avis + email)',
                'Prochain rendez-vous proposé (fidélisation)'
              ].map((item, index) => (
                <Box key={index} component="li" display="flex" alignItems="center" mb={0.5}>
                  <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Chaque vendredi */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              📅 Chaque Vendredi :
            </Typography>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {[
                'Factures envoyées (pour la semaine)',
                'Stock vérifié (papier photo, encres)',
                'Sauvegarde complète des données',
                'Nettoyage approfondi du studio'
              ].map((item, index) => (
                <Box key={index} component="li" display="flex" alignItems="center" mb={0.5}>
                  <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Chaque mois */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              📊 Chaque Mois :
            </Typography>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {[
                'Bilan financier (CA, dépenses, marge)',
                'Analyse des services les plus rentables',
                'Mise à jour des tarifs si nécessaire',
                'Vérification du matériel (objectifs, flashs)',
                'Planification du mois suivant (promotions, événements)'
              ].map((item, index) => (
                <Box key={index} component="li" display="flex" alignItems="center" mb={0.5}>
                  <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        📊 Tableau de Bord Consulting - Optimisation Studio Photo
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Analyse complète de rentabilité, optimisation du temps et modèles économiques pour atteindre vos objectifs
      </Typography>

      <Paper elevation={2} sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="💰 Rentabilité" icon={<TrendingUpIcon />} iconPosition="start" />
          <Tab label="⏳ Optimisation Temps" icon={<TimerIcon />} iconPosition="start" />
          <Tab label="📅 Planning Hebdo" icon={<ScheduleIcon />} iconPosition="start" />
          <Tab label="🎯 Modèles Économiques" icon={<EuroIcon />} iconPosition="start" />
          <Tab label="📋 Procédures" icon={<CheckCircleIcon />} iconPosition="start" />
          <Tab label="⚠️ Vigilance" icon={<WarningIcon />} iconPosition="start" />
        </Tabs>
      </Paper>

      {activeTab === 0 && renderProfitabilityAnalysis()}
      {activeTab === 1 && renderTimeOptimization()}
      {activeTab === 2 && renderWeeklySchedule()}
      {activeTab === 3 && renderBusinessModels()}
      {activeTab === 4 && renderProcedures()}
      {activeTab === 5 && renderWarnings()}
    </Box>
  );
};

export default ConsultingDashboard;
