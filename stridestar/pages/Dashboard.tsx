
import React from 'react';
import StatsChart from '../components/StatsChart';

const Dashboard: React.FC = () => {
  // In a real app we'd get this from a context, but we use props or just mock for now
  // Since we don't have a formal context yet, let's assume it's showing the active session
  return (
    <div className="p-4 space-y-6">
      {/* Welcome & Level */}
      <section className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm font-medium">¡Hola de nuevo!</p>
          <h2 className="text-3xl font-black mt-1 tracking-tight">Atleta Pro</h2>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span>Progreso del nivel</span>
              <span>750 / 1000 ★</span>
            </div>
            <div className="w-full bg-indigo-500/50 h-2 rounded-full">
              <div className="bg-white h-full rounded-full w-3/4 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-4 right-4 text-white/20 text-6xl rotate-12">
          <i className="fa-solid fa-medal"></i>
        </div>
      </section>

      {/* Daily Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-3">
            <i className="fa-solid fa-fire text-sm"></i>
          </div>
          <span className="block text-2xl font-black text-slate-800 tracking-tight">1,240</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calorías</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center mb-3">
            <i className="fa-solid fa-shoe-prints text-sm"></i>
          </div>
          <span className="block text-2xl font-black text-slate-800 tracking-tight">8,432</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pasos</span>
        </div>
      </section>

      {/* Chart Section */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Actividad Semanal</h3>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">KM totales: 25.2</span>
        </div>
        <StatsChart />
      </section>

      {/* Active Challenge */}
      <section className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl shrink-0">
          <i className="fa-solid fa-trophy"></i>
        </div>
        <div>
          <h4 className="font-bold text-orange-900 text-sm">Reto Relámpago</h4>
          <p className="text-orange-700 text-xs">Completa 2 rutas hoy para ganar el doble de estrellas.</p>
        </div>
        <button className="ml-auto bg-orange-200 text-orange-900 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase">
          Ir
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
