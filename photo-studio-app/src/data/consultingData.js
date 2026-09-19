// Données de consulting pour l'analyse de rentabilité et optimisation
export const PROFITABILITY_ANALYSIS = {
  services: [
    {
      id: 'packshot_products',
      name: 'Packshot Produits',
      category: 'appointment',
      priceRange: [150, 300],
      avgPrice: 225,
      duration: 90, // minutes
      margin: 0.85,
      volume: 15, // par mois
      monthlyRevenue: 3375,
      hourlyRate: 150,
      priority: 5,
      color: '#FFD700',
      icon: 'ShoppingBasket',
      description: 'Photos de produits e-commerce avec fond blanc et retouches'
    },
    {
      id: 'model_book',
      name: 'Book Modèle',
      category: 'appointment',
      priceRange: [250, 500],
      avgPrice: 375,
      duration: 120,
      margin: 0.80,
      volume: 8,
      monthlyRevenue: 3000,
      hourlyRate: 187.5,
      priority: 5,
      color: '#FF69B4',
      icon: 'Group',
      description: 'Séance photo complète pour modèles avec plusieurs tenues'
    },
    {
      id: 'professional_portrait',
      name: 'Portrait Professionnel',
      category: 'appointment',
      priceRange: [120, 200],
      avgPrice: 160,
      duration: 60,
      margin: 0.90,
      volume: 20,
      monthlyRevenue: 3200,
      hourlyRate: 160,
      priority: 5,
      color: '#4169E1',
      icon: 'Work',
      description: 'Portrait pour CV, LinkedIn ou site professionnel'
    },
    {
      id: 'family_shooting',
      name: 'Shooting Famille',
      category: 'appointment',
      priceRange: [200, 400],
      avgPrice: 300,
      duration: 90,
      margin: 0.80,
      volume: 12,
      monthlyRevenue: 3600,
      hourlyRate: 200,
      priority: 4,
      color: '#FF4500',
      icon: 'Group',
      description: 'Séance photo familiale avec retouches incluses'
    },
    {
      id: 'newborn_photos',
      name: 'Nouveau-né',
      category: 'appointment',
      priceRange: [300, 600],
      avgPrice: 450,
      duration: 120,
      margin: 0.75,
      volume: 6,
      monthlyRevenue: 2700,
      hourlyRate: 225,
      priority: 4,
      color: '#FFB6C1',
      icon: 'BabyChangingStation',
      description: 'Séance spécialisée pour nouveau-nés avec accessoires'
    },
    {
      id: 'id_photos',
      name: 'Photos d\'Identité',
      category: 'walkin',
      priceRange: [15, 25],
      avgPrice: 20,
      duration: 10,
      margin: 0.95,
      volume: 200,
      monthlyRevenue: 4000,
      hourlyRate: 120,
      priority: 4,
      color: '#32CD32',
      icon: 'PhotoCamera',
      description: 'Photos pour ANTS, passeport, CNI, permis'
    },
    {
      id: 'event_coverage',
      name: 'Reportage Événementiel',
      category: 'appointment',
      priceRange: [500, 1000],
      avgPrice: 750,
      duration: 240,
      margin: 0.70,
      volume: 4,
      monthlyRevenue: 3000,
      hourlyRate: 187.5,
      priority: 3,
      color: '#9932CC',
      icon: 'Camera',
      description: 'Reportage photo pour événements privés ou professionnels'
    },
    {
      id: 'home_portraits',
      name: 'Portraits à Domicile',
      category: 'appointment',
      priceRange: [150, 300],
      avgPrice: 225,
      duration: 90,
      margin: 0.80,
      volume: 10,
      monthlyRevenue: 2250,
      hourlyRate: 150,
      priority: 3,
      color: '#8A2BE2',
      icon: 'Home',
      description: 'Séance photo à domicile pour personnes à mobilité réduite'
    },
    {
      id: 'ecommerce_pack',
      name: 'Pack E-commerce',
      category: 'appointment',
      priceRange: [400, 800],
      avgPrice: 600,
      duration: 180,
      margin: 0.85,
      volume: 5,
      monthlyRevenue: 3000,
      hourlyRate: 200,
      priority: 4,
      color: '#20B2AA',
      icon: 'ShoppingBasket',
      description: 'Pack complet pour site e-commerce (10-20 produits)'
    }
  ]
};

// Tâches à faible valeur ajoutée
export const LOW_VALUE_TASKS = [
  {
    id: 'phone_calls',
    name: 'Réponse aux appels',
    timePerWeek: 5,
    valueAdded: 2,
    automatable: true,
    solution: 'Répondeur automatique + plages dédiées',
    timeSaved: 3,
    color: '#FF6347'
  },
  {
    id: 'emails',
    name: 'Réponse aux emails',
    timePerWeek: 4,
    valueAdded: 2,
    automatable: true,
    solution: 'Templates prédéfinis + FAIQ sur site',
    timeSaved: 2,
    color: '#4682B4'
  },
  {
    id: 'reservations',
    name: 'Gestion des réservations',
    timePerWeek: 3,
    valueAdded: 2,
    automatable: true,
    solution: 'Calendly/Setmore (intégration site)',
    timeSaved: 2.5,
    color: '#32CD32'
  },
  {
    id: 'accounting',
    name: 'Comptabilité',
    timePerWeek: 4,
    valueAdded: 1,
    automatable: true,
    solution: 'QuickBooks/Zoho + expert-comptable',
    timeSaved: 3,
    color: '#FF8C00'
  },
  {
    id: 'social_media',
    name: 'Réseaux sociaux',
    timePerWeek: 6,
    valueAdded: 3,
    automatable: true,
    solution: 'Planification (Buffer/Hootsuite) + batching',
    timeSaved: 3,
    color: '#9370DB'
  },
  {
    id: 'retouching',
    name: 'Retouche photo',
    timePerWeek: 8,
    valueAdded: 4,
    automatable: false,
    solution: 'Presets Lightroom + formation client',
    timeSaved: 2,
    color: '#FF1493'
  },
  {
    id: 'cleaning',
    name: 'Nettoyage du studio',
    timePerWeek: 3,
    valueAdded: 1,
    automatable: false,
    solution: 'Checklist quotidienne + produits à portée',
    timeSaved: 1,
    color: '#696969'
  },
  {
    id: 'website_updates',
    name: 'Mise à jour du site',
    timePerWeek: 2,
    valueAdded: 2,
    automatable: true,
    solution: 'CMS simple (WordPress/Wix)',
    timeSaved: 1.5,
    color: '#2F4F4F'
  }
];

// Planning hebdomadaire optimisé
export const OPTIMIZED_WEEKLY_SCHEDULE = {
  monday: {
    morning: { start: '9:00', end: '12:00', activity: 'Photos d\'Identité (Walk-in)', revenue: 225, color: '#32CD32' },
    afternoon: {
      start: '14:00', end: '17:00', 
      activity: 'Rendez-vous Studio (2x1h30)', 
      revenue: 300, 
      color: '#4169E1'
    },
    evening: { start: '17:00', end: '19:00', activity: 'Administratif', revenue: 0, color: '#808080' }
  },
  tuesday: {
    morning: { start: '9:00', end: '12:00', activity: 'Photos d\'Identité (Walk-in)', revenue: 225, color: '#32CD32' },
    afternoon: {
      start: '14:00', end: '17:00', 
      activity: 'Rendez-vous Studio (2x1h30)', 
      revenue: 300, 
      color: '#4169E1'
    },
    evening: { start: '17:00', end: '19:00', activity: 'Retouche Photo', revenue: 120, color: '#FF1493' }
  },
  wednesday: {
    morning: { start: '9:00', end: '12:00', activity: 'Photos d\'Identité (Walk-in)', revenue: 225, color: '#32CD32' },
    afternoon: {
      start: '14:00', end: '17:00', 
      activity: 'Rendez-vous Studio (2x1h30)', 
      revenue: 300, 
      color: '#4169E1'
    },
    evening: { start: '17:00', end: '19:00', activity: 'Appels/emails', revenue: 0, color: '#4682B4' }
  },
  thursday: {
    morning: { start: '9:00', end: '13:00', activity: 'Photos d\'Identité (Boutique)', revenue: 260, color: '#32CD32' },
    afternoon: { start: '13:00', end: '19:00', activity: 'Déplacements Extérieurs', revenue: 300, color: '#8A2BE2' }
  },
  friday: {
    morning: { start: '9:00', end: '12:00', activity: 'Photos d\'Identité (Walk-in)', revenue: 225, color: '#32CD32' },
    afternoon: {
      start: '14:00', end: '17:00', 
      activity: 'Rendez-vous Studio (2x1h30)', 
      revenue: 300, 
      color: '#4169E1'
    },
    evening: { start: '17:00', end: '19:00', activity: 'Réseaux Sociaux', revenue: 20, color: '#9370DB' }
  },
  saturday: {
    morning: { start: '9:00', end: '13:00', activity: 'Photos d\'Identité (si pas de RDV)', revenue: 200, color: '#32CD32' },
    afternoon: { start: '13:00', end: '19:00', activity: 'Shootings Extérieurs', revenue: 400, color: '#8A2BE2' }
  },
  sunday: {
    closed: true
  }
};

// Modèles économiques
export const BUSINESS_MODELS = {
  model_3k: {
    name: 'Objectif 3 000€/mois',
    target: 3000,
    idPhotosPerDay: 5,
    appointmentsPerWeek: 3,
    externalShootsPerWeek: 0,
    estimatedRevenue: 5000,
    estimatedTime: 35,
    netMargin: 3500,
    description: 'Idéal pour démarrer avec un volume modéré',
    color: '#FFD700'
  },
  model_5k: {
    name: 'Objectif 5 000€/mois',
    target: 5000,
    idPhotosPerDay: 8,
    appointmentsPerWeek: 5,
    externalShootsPerWeek: 2,
    estimatedRevenue: 9360,
    estimatedTime: 40,
    netMargin: 7860,
    description: 'Équilibre parfait entre walk-in et rendez-vous',
    color: '#FF69B4'
  },
  model_8k: {
    name: 'Objectif 8 000€/mois',
    target: 8000,
    idPhotosPerDay: 10,
    appointmentsPerWeek: 8,
    externalShootsPerWeek: 3,
    estimatedRevenue: 13400,
    estimatedTime: 40,
    netMargin: 11860,
    description: 'Volume élevé avec bonne rentabilité',
    color: '#4169E1'
  },
  model_10k: {
    name: 'Objectif 10 000€/mois',
    target: 10000,
    idPhotosPerDay: 12,
    appointmentsPerWeek: 10,
    externalShootsPerWeek: 4,
    estimatedRevenue: 16640,
    estimatedTime: 45,
    netMargin: 14976,
    description: 'Niveau expert avec assistant recommandé',
    color: '#FF4500'
  }
};

// Répartition du temps par activité
export const TIME_DISTRIBUTION = {
  idPhotos: { percentage: 37.5, hoursPerWeek: 15, revenuePerHour: 120, color: '#32CD32' },
  studioAppointments: { percentage: 30, hoursPerWeek: 12, revenuePerHour: 150, color: '#4169E1' },
  retouching: { percentage: 15, hoursPerWeek: 6, revenuePerHour: 80, color: '#FF1493' },
  admin: { percentage: 10, hoursPerWeek: 4, revenuePerHour: 0, color: '#808080' },
  callsEmails: { percentage: 5, hoursPerWeek: 2, revenuePerHour: 0, color: '#4682B4' },
  socialMedia: { percentage: 2.5, hoursPerWeek: 1, revenuePerHour: 20, color: '#9370DB' }
};

// Système de batching
export const BATCHING_SYSTEM = {
  phoneCalls: { timeSlots: ['12:00-13:00', '17:00-18:00'], frequency: 2, timeSaved: 3 },
  emails: { timeSlots: ['13:00-14:00', '18:00-19:00'], frequency: 2, timeSaved: 2 },
  socialMedia: { timeSlots: ['18:30-19:00'], frequency: 1, timeSaved: 3 },
  retouching: { timeSlots: ['16:00-17:00'], frequency: 1, timeSaved: 5 },
  admin: { timeSlots: ['Vendredi 17:00-19:00'], frequency: 1, timeSaved: 2 }
};

// Points de vigilance
export const WARNING_POINTS = [
  {
    id: 'overbooking',
    title: 'Éviter la surcharge',
    description: 'Ne pas accepter plus de 2 rendez-vous simultanés pour maintenir la qualité',
    severity: 'high',
    color: '#FF0000'
  },
  {
    id: 'contracts',
    title: 'Contrats écrits',
    description: 'Toujours utiliser un contrat signé avec dépôt de 50% pour éviter les litiges',
    severity: 'high',
    color: '#FF8C00'
  },
  {
    id: 'pricing',
    title: 'Positionnement premium',
    description: 'Ne pas sous-estimer vos tarifs. Mieux vaut moins de clients à haut prix',
    severity: 'medium',
    color: '#FFD700'
  },
  {
    id: 'backups',
    title: 'Sauvegardes automatiques',
    description: 'Mettre en place un système de sauvegarde cloud + disque dur externe',
    severity: 'high',
    color: '#FF0000'
  },
  {
    id: 'client_followup',
    title: 'Suivi clients',
    description: 'Utiliser un CRM simple pour fidéliser et relancer les clients',
    severity: 'medium',
    color: '#32CD32'
  },
  {
    id: 'equipment_maintenance',
    title: 'Entretien du matériel',
    description: 'Vérifier régulièrement batteries, éclairages et objectifs',
    severity: 'medium',
    color: '#4682B4'
  }
];

// Procédures standardisées
export const STANDARD_PROCEDURES = {
  idPhotos: {
    name: 'Photos d\'Identité',
    steps: [
      { step: 1, action: 'Accueil client et vérification pièce d\'identité', time: 1, icon: 'Person' },
      { step: 2, action: 'Prise de vue (4 poses minimum)', time: 3, icon: 'Camera' },
      { step: 3, action: 'Validation client sur écran', time: 1, icon: 'CheckCircle' },
      { step: 4, action: 'Impression ou export numérique', time: 2, icon: 'PhotoCamera' },
      { step: 5, action: 'Paiement et facturation', time: 1, icon: 'ShoppingCart' }
    ],
    totalTime: 8,
    checklist: [
      'Pièce d\'identité vérifiée',
      'Formule choisie (ANTS/Passeport/CNI)',
      'Fond blanc propre',
      'Éclairage vérifié (2x softboxes 45°)',
      'Appareil en mode RAF',
      '4 poses minimum'
    ]
  },
  studioAppointment: {
    name: 'Rendez-vous Studio',
    steps: [
      { step: 1, action: 'Préparation 10min avant (matériel, fond, éclairage)', time: 10, icon: 'Settings' },
      { step: 2, action: 'Accueil client et briefing', time: 5, icon: 'Person' },
      { step: 3, action: 'Prise de vue (3-5 tenues, 100-200 photos)', time: 40, icon: 'Camera' },
      { step: 4, action: 'Sélection des photos (20-30)', time: 15, icon: 'CheckCircle' },
      { step: 5, action: 'Retouche basique', time: 15, icon: 'PhotoCamera' },
      { step: 6, action: 'Livraison (WeTransfer ou clé USB)', time: 5, icon: 'ShoppingBasket' }
    ],
    totalTime: 90,
    checklist: [
      'Contrat signé et dépôt reçu (50%)',
      'Matériel vérifié (batteries, cartes mémoire)',
      'Studio nettoyé et prêt',
      'Playlist musicale préparée',
      'Eau/café proposé au client'
    ]
  },
  retouching: {
    name: 'Retouche Photo',
    presets: [
      { name: 'ID_Neutre', description: 'Blancs + netteté pour photos d\'identité', timeSaved: 3 },
      { name: 'Portrait_Pro', description: 'Teint + fond pour portraits professionnels', timeSaved: 10 },
      { name: 'Packshot_Blanc', description: 'Fond pur + ombres pour packshots', timeSaved: 10 },
      { name: 'Famille_Naturel', description: 'Couleurs chaudes pour photos famille', timeSaved: 15 }
    ]
  }
};

export default {
  PROFITABILITY_ANALYSIS,
  LOW_VALUE_TASKS,
  OPTIMIZED_WEEKLY_SCHEDULE,
  BUSINESS_MODELS,
  TIME_DISTRIBUTION,
  BATCHING_SYSTEM,
  WARNING_POINTS,
  STANDARD_PROCEDURES
};
