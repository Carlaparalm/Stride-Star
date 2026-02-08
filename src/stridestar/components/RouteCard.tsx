
import React from 'react';
import { Route } from '../types';

interface RouteCardProps {
  route: Route;
  onSelect: (route: Route) => void;
  locked?: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onSelect, locked }) => {
  const diffColors = {
    'Fácil': 'bg-green-100 text-green-700',
    'Media': 'bg-yellow-100 text-yellow-700',
    'Difícil': 'bg-red-100 text-red-700'
  };

  return (
    <div 
      onClick={() => !locked && onSelect(route)}
      className={`relative p-4 rounded-2xl border transition-all duration-300 ${locked ? 'bg-slate-100 opacity-60' : 'bg-white border-slate-100 shadow-sm active:scale-95 cursor-pointer hover:shadow-md'}`}
    >
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-200/40 rounded-2xl">
          <i className="fa-solid fa-lock text-slate-500 text-2xl mb-1"></i>
          <span className="text-xs font-bold text-slate-600">{route.starsRequired} estrellas</span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${diffColors[route.difficulty]}`}>
          {route.difficulty}
        </span>
        <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
          <i className="fa-solid fa-star"></i>
          {route.starsReward}
        </div>
      </div>

      <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{route.name}</h3>
      <p className="text-slate-500 text-xs line-clamp-2 mb-3">{route.description}</p>

      <div className="flex items-center justify-between text-slate-400 text-xs">
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-person-running"></i>
          <span>{route.distance} km</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-location-dot"></i>
          <span>{route.pointsOfInterest.length} puntos</span>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
