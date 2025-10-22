'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Componente del mapa cargado dinámicamente para evitar errores de SSR
const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse rounded-3xl"></div>
  }
);

export default function Home() {
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);

  // Usando useEffect para actualizar el estado de forma segura
  useEffect(() => {
    // Usamos setTimeout para evitar la actualización sincrónica
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []); // Array vacío para ejecutar solo una vez

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-amber-100">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-lg">
        {/* Sección del mapa */}
        <div className="relative h-96 w-full p-4">
          <div className="h-full w-full rounded-3xl overflow-hidden border border-gray-200 shadow-md">
            {isClient && <MapComponent />}
            
            {/* Botón de retroceso */}
            <button className="absolute top-8 left-8 bg-white p-2 rounded-full shadow-md z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Indicador de distancia */}
            <div className="absolute bottom-8 left-8 bg-amber-400 text-black font-bold py-2 px-4 rounded-full z-10">
              <span className="text-xl">2.03</span>
              <span className="text-sm ml-1">km</span>
            </div>
          </div>
        </div>
        
        {/* Sección de actividad */}
        <div className="p-4">
          <div className="bg-gray-900 text-white p-4 rounded-3xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                {/* Icono de zapato para running */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 5.5L21 14l-2 1h-4.5L9 11l-1.5 1 1 2H5l-1-1.5L9 3l5 1.5 1 2 4.5 1z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-400">Running</p>
                <p className="text-sm text-gray-400">3000 meters per day</p>
                <div className="w-24 h-1 bg-gray-700 rounded-full mt-1">
                  <div className="w-1/2 h-1 bg-amber-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección de estadísticas */}
        <div className="p-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-black">Today</h2>
            <div className="flex justify-between">
              <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm">
                <div className="mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-bold text-lg text-black">2.03</p>
                <p className="text-xs text-black">Kilometer</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm">
                <div className="mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-bold text-lg text-black">15</p>
                <p className="text-xs text-black">minutes</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm">
                <div className="mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <p className="font-bold text-lg text-black">75</p>
                <p className="text-xs text-black">Calories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}