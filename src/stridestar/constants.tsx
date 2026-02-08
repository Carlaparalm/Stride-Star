
import { Route, Friend, SocialGoal } from './types';

export const MOCK_ROUTES: Route[] = [
  {
    id: 'r1',
    name: 'Senda del Parque Central',
    description: 'Un recorrido tranquilo por el pulmón de la ciudad, ideal para principiantes.',
    distance: 3.5,
    difficulty: 'Fácil',
    starsReward: 5,
    starsRequired: 0,
    pointsOfInterest: [
      { id: 'p1', name: 'Fuente de los Deseos', type: 'fountain', lat: 0, lng: 0 },
      { id: 'p2', name: 'Mirador del Roble', type: 'nature', lat: 0, lng: 0 }
    ],
    createdBy: 'Admin'
  },
  {
    id: 'r2',
    name: 'Desafío Histórico',
    description: 'Recorre los monumentos más emblemáticos del casco antiguo.',
    distance: 5.2,
    difficulty: 'Media',
    starsReward: 12,
    starsRequired: 10,
    pointsOfInterest: [
      { id: 'p3', name: 'Estatua del Fundador', type: 'monument', lat: 0, lng: 0 },
      { id: 'p4', name: 'Arco del Triunfo', type: 'monument', lat: 0, lng: 0 }
    ],
    createdBy: 'Admin'
  },
  {
    id: 'r3',
    name: 'Ruta de las Colinas',
    description: 'Un entrenamiento intensivo con pendientes pronunciadas y vistas increíbles.',
    distance: 8.0,
    difficulty: 'Difícil',
    starsReward: 25,
    starsRequired: 50,
    pointsOfInterest: [
      { id: 'p5', name: 'Cima Norte', type: 'nature', lat: 0, lng: 0 },
      { id: 'p6', name: 'Paso del Lobo', type: 'nature', lat: 0, lng: 0 }
    ],
    createdBy: 'User123'
  }
];

export const MOCK_FRIENDS: Friend[] = [
  { id: 'f1', name: 'Carlos Ruiz', avatar: 'https://picsum.photos/seed/carlos/100/100', stars: 145, isOnline: true },
  { id: 'f2', name: 'Elena Gómez', avatar: 'https://picsum.photos/seed/elena/100/100', stars: 89, isOnline: false },
  { id: 'f3', name: 'Santi Marín', avatar: 'https://picsum.photos/seed/santi/100/100', stars: 210, isOnline: true }
];

export const MOCK_GOALS: SocialGoal[] = [
  {
    id: 'g1',
    title: 'Objetivo Semanal de Grupo',
    target: 500,
    current: 342,
    type: 'stars',
    deadline: '2023-12-31',
    participants: ['f1', 'f3', 'me']
  }
];
