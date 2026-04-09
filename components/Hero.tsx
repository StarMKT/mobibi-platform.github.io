import React from 'react';
import { Crown, Shield, Zap } from 'lucide-react';

type HeroProps = {
  onSelectCategory?: (category: 'X' | 'Comfort' | 'Black') => void;
  customTitle?: string;
  customDescription?: string;
};

const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  customTitle,
  customDescription,
}) => {
  return (
    <section className="bg-red-600 text-white pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">
          {customTitle ?? 'Reserve Agora'}
        </h1>

        <p className="text-lg mb-10">
          {customDescription ??
            'Reserve seu veículo agora mesmo. Assistência 24h.'}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <button
            type="button"
            onClick={() => onSelectCategory?.('X')}
            className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 text-left w-full hover:bg-white/15 transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Zap />
              </div>

              <span className="text-xs font-semibold bg-black text-white px-2 py-1 rounded">
                X
              </span>
            </div>

            <h3 className="text-xl font-semibold">O mais básico</h3>

            <p className="text-sm opacity-80 mb-4">
              Ideal para o dia a dia na cidade.
            </p>

            <p className="text-lg font-bold">
              A partir de R$ 650 <span className="text-sm">/semana</span>
            </p>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory?.('Comfort')}
            className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 text-left w-full hover:bg-white/15 transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Shield />
              </div>

              <span className="text-xs font-semibold bg-black text-white px-2 py-1 rounded">
                Comfort
              </span>
            </div>

            <h3 className="text-xl font-semibold">Conforto</h3>

            <p className="text-sm opacity-80 mb-4">
              Mais espaço e motorização.
            </p>

            <p className="text-lg font-bold">
              A partir de R$ 980 <span className="text-sm">/semana</span>
            </p>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory?.('Black')}
            className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 text-left w-full hover:bg-white/15 transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Crown />
              </div>

              <span className="text-xs font-semibold bg-black text-white px-2 py-1 rounded">
                Black
              </span>
            </div>

            <h3 className="text-xl font-semibold">Premium</h3>

            <p className="text-sm opacity-80 mb-4">
              Experiência superior e estilo.
            </p>

            <p className="text-lg font-bold">
              A partir de R$ 1.600 <span className="text-sm">/semana</span>
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;