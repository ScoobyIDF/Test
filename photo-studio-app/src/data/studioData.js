// Horaires du studio
const STUDIO_HOURS = {
  lundi: { open: 9, close: 19, closed: false },
  mardi: { open: 9, close: 19, closed: false },
  mercredi: { open: 9, close: 19, closed: false },
  jeudi: { open: [9, 13], close: [13, 19], closed: false, split: true },
  vendredi: { open: 9, close: 19, closed: false },
  samedi: { open: 9, close: 19, closed: false },
  dimanche: { open: 0, close: 0, closed: true }
};

// Types de prestations
const SERVICE_TYPES = [
  {
    id: 'id_photo',
    name: 'Photo d\'identité',
    iconName: 'Person',
    description: 'Photo d\'identité sans rendez-vous',
    duration: 10,
    price: 15,
    walkIn: true,
    color: '#4CAF50'
  },
  {
    id: 'family',
    name: 'Séance famille',
    iconName: 'Group',
    description: 'Séance photo en studio pour famille',
    duration: 60,
    price: 120,
    walkIn: false,
    color: '#2196F3'
  },
  {
    id: 'baby',
    name: 'Séance bébé',
    iconName: 'BabyChangingStation',
    description: 'Séance photo pour bébés',
    duration: 45,
    price: 80,
    walkIn: false,
    color: '#FF9800'
  },
  {
    id: 'model',
    name: 'Modèle occasionnel',
    iconName: 'Camera',
    description: 'Shooting photo pour modèles',
    duration: 90,
    price: 200,
    walkIn: false,
    color: '#9C27B0'
  },
  {
    id: 'product',
    name: 'Pack produits',
    iconName: 'ShoppingBasket',
    description: 'Prise de vue de produits',
    duration: 120,
    price: 300,
    walkIn: false,
    color: '#F44336'
  },
  {
    id: 'home_visit',
    name: 'Photo à domicile',
    iconName: 'Home',
    description: 'Photo d\'identité ou shooting à domicile',
    duration: 60,
    price: 150,
    walkIn: false,
    color: '#607D8B'
  },
  {
    id: 'outdoor',
    name: 'Shooting extérieur',
    iconName: 'PhotoCamera',
    description: 'Shooting photo en extérieur',
    duration: 120,
    price: 250,
    walkIn: false,
    color: '#795548'
  }
];

// Statuts des rendez-vous
const APPOINTMENT_STATUSES = [
  { value: 'confirmed', label: 'Confirmé', color: '#4CAF50' },
  { value: 'pending', label: 'En attente', color: '#FFC107' },
  { value: 'completed', label: 'Terminé', color: '#9E9E9E' },
  { value: 'cancelled', label: 'Annulé', color: '#F44336' },
  { value: 'no_show', label: 'Non présenté', color: '#607D8B' }
];

export { STUDIO_HOURS, SERVICE_TYPES, APPOINTMENT_STATUSES };
