
import React, { useEffect, useRef } from 'react';

interface Point {
  lat: number;
  lng: number;
  name?: string;
}

interface InteractiveMapProps {
  points?: Point[];
  onMapClick?: (lat: number, lng: number) => void;
  center?: [number, number];
  zoom?: number;
  // Added location prop to support centering the map by place name or address string
  location?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  points = [], 
  onMapClick, 
  center = [40.4168, -3.7038], // Madrid por defecto
  zoom = 13,
  location
}) => {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Inicializar mapa
    const L = (window as any).L;
    mapRef.current = L.map(containerRef.current).setView(center, zoom);

    // Añadir capa de azulejos (OpenStreetMap con estilo limpio)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(mapRef.current);

    // Manejar clics
    if (onMapClick) {
      mapRef.current.on('click', (e: any) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map center when location string changes (e.g. from search results)
  useEffect(() => {
    if (!mapRef.current || !location) return;

    // Simple geocoding fallback using Nominatim (OpenStreetMap)
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 15);
        }
      })
      .catch(err => console.error("Error geocoding location:", err));
  }, [location]);

  // Actualizar marcadores y polilínea cuando cambian los puntos
  useEffect(() => {
    if (!mapRef.current) return;
    const L = (window as any).L;

    // Limpiar marcadores antiguos
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const latLngs: [number, number][] = [];

    points.forEach((p, idx) => {
      latLngs.push([p.lat, p.lng]);
      
      const icon = L.divIcon({
        html: `
          <div class="flex items-center justify-center">
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-black border-4 border-white shadow-xl transform transition-transform hover:scale-110">
              ${idx + 1}
            </div>
          </div>
        `,
        className: 'custom-div-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([p.lat, p.lng], { icon }).addTo(mapRef.current);
      if (p.name) {
        marker.bindPopup(`<div class="font-bold text-xs p-1">${p.name}</div>`);
      }
      markersRef.current.push(marker);
    });

    // Dibujar línea de la ruta
    if (polylineRef.current) polylineRef.current.remove();
    if (latLngs.length > 1) {
      polylineRef.current = L.polyline(latLngs, {
        color: '#4f46e5',
        weight: 4,
        opacity: 0.6,
        dashArray: '10, 10',
        lineJoin: 'round'
      }).addTo(mapRef.current);

      // Ajustar vista para mostrar toda la ruta
      mapRef.current.fitBounds(polylineRef.current.getBounds(), { padding: [40, 40] });
    }
  }, [points]);

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      <div ref={containerRef} className="w-full h-full z-0" />
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-indigo-50 flex items-center gap-2 pointer-events-none">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">StrideMap Interactivo</span>
      </div>
      <div className="absolute bottom-4 left-4 z-[1000] bg-indigo-900/80 backdrop-blur-md px-3 py-2 rounded-2xl text-[9px] text-indigo-100 font-bold max-w-[140px]">
        <i className="fa-solid fa-hand-pointer mr-1"></i> Pulsa en el mapa para añadir puntos de interés
      </div>
    </div>
  );
};

export default InteractiveMap;
