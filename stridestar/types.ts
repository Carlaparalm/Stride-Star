
export interface POI {
  id: string;
  name: string;
  type: 'park' | 'monument' | 'fountain' | 'nature' | 'sport';
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  name: string;
  description: string;
  distance: number;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  starsReward: number;
  starsRequired: number;
  pointsOfInterest: POI[];
  createdBy: string;
  completed?: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  avatar: string;
  stars: number;
  level: number;
  email: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  stars: number;
  isOnline: boolean;
}

export interface SocialGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  type: 'stars' | 'km';
  deadline: string;
  participants: string[];
}
