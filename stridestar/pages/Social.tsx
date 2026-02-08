
import React from 'react';
import { MOCK_FRIENDS, MOCK_GOALS } from '../constants';

const Social: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800">Comunidad</h2>
        <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
          <i className="fa-solid fa-user-plus"></i>
        </button>
      </header>

      {/* Goals / Challenges */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Metas Compartidas</h3>
          <span className="text-xs font-bold text-indigo-600">+ Nueva Meta</span>
        </div>
        {MOCK_GOALS.map(goal => (
          <div key={goal.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-black text-slate-800 text-lg leading-tight">{goal.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quedan 3 días</p>
              </div>
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <i className="fa-solid fa-bullseye"></i>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Progreso Colectivo</span>
                <span>{goal.current} / {goal.target} ★</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center -space-x-2">
              {MOCK_FRIENDS.map(f => (
                <img key={f.id} src={f.avatar} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt={f.name} />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                +2
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Friends Leaderboard */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800">Ranking de Amigos</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-50">
          {MOCK_FRIENDS.sort((a, b) => b.stars - a.stars).map((friend, idx) => (
            <div key={friend.id} className="p-4 flex items-center gap-4">
              <div className="w-6 text-center font-black text-slate-400 text-sm italic">
                {idx + 1}
              </div>
              <div className="relative">
                <img src={friend.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={friend.name} />
                {friend.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm">{friend.name}</h4>
                <p className="text-[10px] text-slate-400">Hace 2 horas</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-orange-500 flex items-center gap-1 justify-end">
                  <i className="fa-solid fa-star text-xs"></i>
                  {friend.stars}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Estrellas</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Social;
