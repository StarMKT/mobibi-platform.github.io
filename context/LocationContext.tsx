import React, { useEffect, useState } from 'react';
import { MapPin, X } from 'lucide-react';

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Verifica se já temos a localização ou se o usuário dispensou recentemente
    const storedLocation = localStorage.getItem('mobibi_location');
    const isDismissed = localStorage.getItem('mobibi_location_dismissed');

    if (!storedLocation && !isDismissed) {
      // Pequeno delay para não ser abrupto na entrada
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = () => {
    if (!('geolocation' in navigator)) {
      console.warn('Geolocalização não é suportada por este navegador.');
      setShowPopup(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        localStorage.setItem('mobibi_location', JSON.stringify(locationData));
        setShowPopup(false);
      },
      (error) => {
        console.warn('Erro ao obter localização ou permissão negada:', error.message);
        // Se der erro ou negar, fechamos o popup e marcamos como dispensado para não insistir
        setShowPopup(false);
        localStorage.setItem('mobibi_location_dismissed', 'true');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleDismiss = () => {
    setShowPopup(false);
    localStorage.setItem('mobibi_location_dismissed', 'true');
  };

  return (
    <>
      {children}
      {showPopup && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-5">
          <button 
            onClick={handleDismiss} 
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="bg-brand-light p-3 rounded-full text-brand shrink-0">
                <MapPin size={24} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 mb-1">Podemos usar sua localização?</h4>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Utilizamos sua localização para encontrar as melhores ofertas e veículos próximos a você.
                </p>
                <div className="flex gap-3">
                    <button 
                        onClick={handleAllow}
                        className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md shadow-brand/20"
                    >
                        Permitir
                    </button>
                    <button 
                        onClick={handleDismiss}
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Agora não
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};