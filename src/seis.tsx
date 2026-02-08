
import React, { useState, useEffect } from 'react';
import { getAIRouteSuggestion } from '../geminiService';
import InteractiveMap from '../components/InteractiveMap';

interface Waypoint {
  lat: number;
  lng: number;
  name: string;
}

const CreateRoute: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [tempPoint, setTempPoint] = useState<Waypoint | null>(null);

  const handleGenerateAI = async () => {
    setLoading(true);
    const result = await getAIRouteSuggestion('enérgico', 'intermedio');
    setAiSuggestion(result);
    if (result && result.pois) {
      const simulatedWaypoints = result.pois.map((poi: any, i: number) => ({
        lat: 40.4168 + (Math.random() - 0.5) * 0.01,
        lng: -3.7038 + (Math.random() - 0.5) * 0.01,
        name: poi.name
      }));
      setWaypoints(simulatedWaypoints);
    }
    setLoading(false);
  };

  const onMapClick = (lat: number, lng: number) => {
    setTempPoint({ lat, lng, name: `Punto ${waypoints.length + 1}` });
  };

  const addWaypoint = () => {
    if (tempPoint) {
      setWaypoints([...waypoints, tempPoint]);
      setTempPoint(null);
    }
  };

  const removeWaypoint = (index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  };

  const updateWaypointName = (index: number, newName: string) => {
    const updated = [...waypoints];
    updated[index].name = newName;
    setWaypoints(updated);
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <header>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Crea tu Ruta</h2>
        <p className="text-sm text-slate-500">Dibuja tu propio camino y personaliza cada parada.</p>
      </header>

      {/* AI Assistant Banner */}
      <div className="bg-indigo-600 p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fa-solid fa-sparkles"></i>
            Asistente Inteligente
          </h3>
          <p className="text-indigo-100 text-[10px] mt-1 mb-4">¿Sin inspiración? Deja que Gemini trace los puntos por ti.</p>
          <button 
            onClick={handleGenerateAI}
            disabled={loading}
            className="w-full bg-white text-indigo-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading && <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>}
            {loading ? 'CALCULANDO RUTA...' : 'DISEÑAR CON IA'}
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 text-white/10 text-9xl">
          <i className="fa-solid fa-route"></i>
        </div>
      </div>

      {/* Main Creation Section */}
      <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-1 tracking-widest">Editor de Ruta</label>
          
          <div className="relative h-80 w-full rounded-[28px] overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100">
            <InteractiveMap 
              points={waypoints} 
              onMapClick={onMapClick} 
            />

            {/* Modal flotante de "Añadir punto" con edición de nombre */}
            {tempPoint && (
              <div className="absolute inset-x-4 bottom-4 z-[1001] bg-white/95 backdrop-blur p-4 rounded-2xl shadow-2xl border border-indigo-100 animate-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                      <i className="fa-solid fa-location-crosshairs"></i>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">Personalizar nombre</span>
                      <input 
                        className="text-sm font-bold bg-transparent border-none p-0 focus:ring-0 text-slate-800 placeholder:text-slate-300 w-full"
                        value={tempPoint.name}
                        autoFocus
                        onChange={(e) => setTempPoint({...tempPoint, name: e.target.value})}
                        onKeyPress={(e) => e.key === 'Enter' && addWaypoint()}
                        placeholder="Ej: Mi Parque Favorito"
                      />
                    </div>
                  </div>
                  <button onClick={() => setTempPoint(null)} className="text-slate-300 hover:text-slate-500 transition-colors">
                    <i className="fa-solid fa-circle-xmark text-xl"></i>
                  </button>
                </div>
                <button 
                  onClick={addWaypoint}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
                >
                  Añadir punto de interés
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Waypoints List with Inline Editing */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Puntos seleccionados ({waypoints.length})</h4>
            {waypoints.length > 0 && (
              <button onClick={() => setWaypoints([])} className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">Limpiar mapa</button>
            )}
          </div>

          {waypoints.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm text-slate-200">
                <i className="fa-solid fa-map-pin text-xl"></i>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest px-8">Toca el mapa para situar tus estrellas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waypoints.map((wp, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-all group animate-in slide-in-from-left-2 duration-300">
                  <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <input 
                      type="text"
                      className="text-xs font-bold text-slate-700 bg-transparent border-none p-0 focus:ring-0 w-full"
                      value={wp.name}
                      onChange={(e) => updateWaypointName(i, e.target.value)}
                      placeholder="Nombre del punto..."
                    />
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Toca para renombrar</span>
                  </div>
                  <button 
                    onClick={() => removeWaypoint(i)}
                    className="w-8 h-8 flex items-center justify-center text-slate-200 hover:text-red-500 transition-colors"
                  >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Details */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Nombre de la Aventura</label>
            <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl text-sm border-2 border-transparent focus:border-indigo-100 outline-none transition-all placeholder:text-slate-300" placeholder="Ej: Mi Ruta de la Calma" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50/50">
              <span className="block text-[9px] font-black text-indigo-400 uppercase mb-1 tracking-widest">Distancia Est.</span>
              <span className="text-xl font-black text-indigo-900 tracking-tighter">{(waypoints.length * 0.85).toFixed(1)} km</span>
            </div>
            <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-50/50">
              <span className="block text-[9px] font-black text-orange-400 uppercase mb-1 tracking-widest">Recompensa</span>
              <span className="text-xl font-black text-orange-900 tracking-tighter">{waypoints.length * 5} ★</span>
            </div>
          </div>
        </div>

        <button 
          disabled={waypoints.length < 2}
          className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.25em] shadow-xl active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
        >
          PUBLICAR RUTA
        </button>
      </section>
    </div>
  );
};

export default CreateRoute;
