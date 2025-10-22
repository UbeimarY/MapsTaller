'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// Importamos Leaflet solo en el cliente
// @ts-expect-error - Leaflet se importa dinámicamente solo en el cliente
let L: typeof import('leaflet') = null;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  L = require('leaflet');
}

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Verificamos que estemos en el cliente y que L esté definido
    if (typeof window !== 'undefined' && mapRef.current && L) {
      // Coordenadas del centro del mapa (ejemplo)
      const center: [number, number] = [12.9716, 77.5946]; // Bangalore como ejemplo
      
      // Crear el mapa
      const map = L.map(mapRef.current).setView(center, 15);
      
      // Añadir capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Definir la ruta (coordenadas de ejemplo para simular la ruta mostrada)
      const routePoints: [number, number][] = [
        [12.9716, 77.5946],
        [12.9726, 77.5956],
        [12.9736, 77.5966],
        [12.9746, 77.5976],
        [12.9756, 77.5986],
        [12.9766, 77.5996],
        [12.9776, 77.6006],
        [12.9786, 77.6016],
        [12.9796, 77.6026],
        [12.9806, 77.6036],
      ];
      
      // Crear una polilínea para la ruta con animación
      const polyline = L.polyline([], {
        color: '#F59E0B', // Color ámbar para coincidir con el diseño
        weight: 5,
      }).addTo(map);
      
      // Animación para trazar la línea
      let i = 0;
      const animateRoute = () => {
        if (i < routePoints.length) {
          const currentPath = routePoints.slice(0, i + 1);
          polyline.setLatLngs(currentPath);
          i++;
          setTimeout(animateRoute, 200); // Velocidad de la animación
        }
      };
      
      // Iniciar la animación
      animateRoute();
      
      // Añadir marcadores de inicio y fin
      const startIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #10B981; width: 12px; height: 12px; border-radius: 50%;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      
      const endIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #000000; width: 12px; height: 12px; border-radius: 50%;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      
      L.marker(routePoints[0] as [number, number], { icon: startIcon }).addTo(map);
      L.marker(routePoints[routePoints.length - 1] as [number, number], { icon: endIcon }).addTo(map);
      
      // Limpiar al desmontar
      return () => {
        map.remove();
      };
    }
  }, []);
  
  return <div ref={mapRef} className="h-full w-full z-0" />;
};

export default MapComponent;  