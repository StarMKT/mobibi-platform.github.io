import React from 'react';
import { Vehicle } from '../types';
import { Users, Fuel, Gauge } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const WHATSAPP_PHONE = '5511960474488';

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const vehicleLabel = `${vehicle.brand} ${vehicle.model}`.trim();
  const vehicleLabelUpper = vehicleLabel.toUpperCase();

  const whatsappMessage = `Olá! Vim pelo site da Mobibi! O carro ${vehicleLabelUpper} está disponível?`;
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleReserveClick = () => {
    if (!vehicle.isAvailable) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
          {vehicle.category}
        </div>

        {!vehicle.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm transform -rotate-12">
              Indisponível
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900">
            {vehicle.brand} {vehicle.model}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {vehicle.description}
          </p>
        </div>

        <div className="flex items-center gap-4 my-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1" title="Passageiros">
            <Users size={16} />
            <span>{vehicle.seats}</span>
          </div>

          <div className="flex items-center gap-1" title="Transmissão">
            <Gauge size={16} />
            <span>{vehicle.transmission === 'Automático' ? 'Auto' : 'Man'}</span>
          </div>

          <div className="flex items-center gap-1" title="Combustível">
            <Fuel size={16} />
            <span>Flex</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-center">
          <button
            type="button"
            onClick={handleReserveClick}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors ${
              vehicle.isAvailable
                ? 'bg-brand text-white hover:bg-brand-dark'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!vehicle.isAvailable}
          >
            {vehicle.isAvailable ? 'Reservar' : 'Esgotado'}
          </button>
        </div>
      </div>
    </div>
  );
};