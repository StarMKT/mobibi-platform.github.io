import React, { useEffect, useMemo, useRef, useState } from 'react';
import { XCircle, Headset, CarFront, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import { VehicleCard } from '../components/VehicleCard';
import useVehicles from '../context/VehicleContext';

interface HomeProps {
  seoTitle?: string;
  heroTitle?: string;
  heroDescription?: string;
  initialFilters?: string[];
}

type FleetCategory = 'ALL' | 'X' | 'Comfort' | 'Black';

export const Home: React.FC<HomeProps> = ({
  seoTitle,
  heroTitle,
  heroDescription,
  initialFilters = [],
}) => {
  const { vehicles } = useVehicles();
  const fleetRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<FleetCategory>('ALL');

  useEffect(() => {
    document.title = seoTitle ? `${seoTitle} - Mobibi` : 'Mobibi - Aluguel de Carros';
  }, [seoTitle]);

  useEffect(() => {
    const firstFilter = initialFilters[0];

    if (firstFilter === 'X' || firstFilter === 'Comfort' || firstFilter === 'Black') {
      setActiveCategory(firstFilter);
    } else {
      setActiveCategory('ALL');
    }
  }, [initialFilters]);

  const scrollToFleet = () => {
    requestAnimationFrame(() => {
      fleetRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleCategorySelect = (category: 'X' | 'Comfort' | 'Black') => {
    setActiveCategory(category);
    scrollToFleet();
  };

  const clearFilter = () => {
    setActiveCategory('ALL');
    scrollToFleet();
  };

  const displayedVehicles = useMemo(() => {
    const availableVehicles = vehicles.filter((vehicle) => vehicle.isAvailable);

    if (activeCategory === 'ALL') return availableVehicles;

    return availableVehicles.filter((vehicle) => vehicle.category === activeCategory);
  }, [vehicles, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        onSelectCategory={handleCategorySelect}
        customTitle={heroTitle}
        customDescription={heroDescription}
      />

      <main
        ref={fleetRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-3">
              Nossa Frota
            </h2>
            <p className="text-2xl text-gray-600">
              Escolha o carro ideal para o seu momento.
            </p>
          </div>

          {activeCategory !== 'ALL' ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-gray-500">Filtrando por</div>
                <div className="font-semibold text-gray-900">{activeCategory}</div>
              </div>

              <button
                type="button"
                onClick={clearFilter}
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition"
              >
                <XCircle size={18} />
                Ver todos os grupos
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={clearFilter}
              className="hidden md:block text-red-600 font-semibold hover:text-red-700 transition"
            >
              Ver todos os grupos →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {displayedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {displayedVehicles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mt-8">
            <p className="text-xl text-gray-500">
              Nenhum veículo disponível para esta categoria no momento.
            </p>

            <button
              type="button"
              onClick={clearFilter}
              className="mt-4 text-red-600 font-semibold hover:underline"
            >
              Ver toda a frota
            </button>
          </div>
        )}

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Por que alugar com a Mobibi?
          </h3>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4 flex flex-col items-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Headset size={28} />
              </div>
              <h4 className="font-semibold text-lg mb-2">Atendimento ágil</h4>
              <p className="text-gray-600">
                Processo simples, rápido e pensado para facilitar sua locação.
              </p>
            </div>

            <div className="p-4 flex flex-col items-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <CarFront size={28} />
              </div>
              <h4 className="font-semibold text-lg mb-2">Frota selecionada</h4>
              <p className="text-gray-600">
                Veículos organizados por categoria para cada perfil de uso.
              </p>
            </div>

            <div className="p-4 flex flex-col items-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Zap size={28} />
              </div>
              <h4 className="font-semibold text-lg mb-2">Mais praticidade</h4>
              <p className="text-gray-600">
                Escolha o grupo ideal e encontre rapidamente a opção certa.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};