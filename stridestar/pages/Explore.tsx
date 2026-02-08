
import React, { useState, useEffect } from 'react';
import RouteCard from '../components/RouteCard';
import { MOCK_ROUTES } from '../constants';
import { searchPlacesWithMaps } from '../geminiService';
import InteractiveMap from '../components/InteractiveMap';

const Explore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentMapLocation, setCurrentMapLocation] = useState<string | undefined>(undefined);
  const [mapsResults, setMapsResults] = useState<{ text: string, links: { uri: string, title: string }[] } | null>(null);
  const userStars = 124;

  const categories = ['Todas', 'Parques', 'Ciudad', 'Naturaleza'];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setMapsResults(null);
    setCurrentMapLocation(searchQuery);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const result = await searchPlacesWithMaps(searchQuery, pos.coords.latitude, pos.coords.longitude);
        processResults(result);
      },
      async () => {
        const result = await searchPlacesWithMaps(searchQuery);
        processResults(result);
      }
    );
  };

  const processResults = (result: any) => {
    if (result) {
      const links = result.groundingChunks
        .filter((chunk: any) => chunk.maps)
        .map((chunk: any) => ({
          uri: chunk.maps.uri,
          title: chunk.maps.title || 'Ver en Google Maps'
        }));
      
      setMapsResults({
        text: result.text,
        links: links
      });

      // Si hay un título claro en el primer link, centramos el mapa ahí
      if (links.length > 0) {
        setCurrentMapLocation(links[0].title);
      }
    } else {
      // Si falla la herramienta de Maps por 404, al menos centramos el mapa en la búsqueda
      setCurrentMapLocation(searchQuery);
    }
    setIsSearching(false);
  };

  const selectPlace = (title: string) => {
    setCurrentMapLocation(title);
    // Scroll suave hacia arriba para ver el mapa
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Buscador de Lugares Reales */}
      <header className="space-y-4">
        <form onSubmit={handleSearch} className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca parques, fuentes, monumentos..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm text-sm"
          />
          {searchQuery && (
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-wider shadow-md"
            >
              BUSCAR
            </button>
          )}
        </form>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Mapa Interactivo */}
      <div className="relative h-64 w-full bg-slate-200 rounded-[32px] overflow-hidden shadow-lg border-4 border-white">
        <InteractiveMap location={currentMapLocation} />
        {isSearching && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Actualizando Mapa...</span>
            </div>
          </div>
        )}
      </div>

      {/* Resultados de Búsqueda de IA */}
      {mapsResults && (
        <div className="bg-white p-6 rounded-[32px] border border-indigo-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">
              <i className="fa-solid fa-wand-magic-sparkles text-lg"></i>
              Recomendaciones de la IA
            </div>
            <button onClick={() => setMapsResults(null)} className="text-slate-300 hover:text-slate-500">
              <i className="fa-solid fa-circle-xmark text-xl"></i>
            </button>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed mb-6 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-50 italic">
            {mapsResults.text}
          </div>
          
          {mapsResults.links.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Lugares encontrados:</p>
              <div className="grid grid-cols-1 gap-2">
                {mapsResults.links.map((link, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50 transition-all group shadow-sm cursor-pointer"
                    onClick={() => selectPlace(link.title)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                        <i className="fa-solid fa-location-dot text-xs"></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-700 group-hover:text-indigo-700">{link.title}</span>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Pulsa para ver en el mapa</span>
                      </div>
                    </div>
                    <a 
                      href={link.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-indigo-500 transition-colors"
                    >
                      <i className="fa-solid fa-external-link-alt text-sm"></i>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rutas Tradicionales */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Rutas Pro de StrideStar</h3>
          <span className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter">Más info</span>
        </div>
        
        <div className="space-y-4">
          {MOCK_ROUTES.map(route => (
            <RouteCard 
              key={route.id} 
              route={route} 
              onSelect={(r) => selectPlace(r.name)}
              locked={route.starsRequired > userStars}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
