import React, { useState } from 'react';
import { Eye, EyeOff, PlusCircle, Sparkles, Trash2 } from 'lucide-react';
import { useVehicles } from '../context/VehicleContext';
import { Vehicle } from '../types';

type Category = 'X' | 'Comfort' | 'Black';
type Transmission = 'Manual' | 'Automático';

export const Admin: React.FC = () => {
  const { vehicles, addVehicle, removeVehicle, toggleAvailability } = useVehicles();

  const [formData, setFormData] = useState<{
    brand: string;
    model: string;
    category: Category;
    pricePerDay: string;
    imageUrl: string;
    description: string;
    transmission: Transmission;
    seats: number;
  }>({
    brand: '',
    model: '',
    category: 'X',
    pricePerDay: '',
    imageUrl: '',
    description: '',
    transmission: 'Manual',
    seats: 5,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'seats' ? Number(value) : value,
    }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.brand && !formData.model) return;

    setIsGenerating(true);

    try {
      const generated = `${formData.brand} ${formData.model}`.trim()
        ? `${formData.brand} ${formData.model} oferece conforto, praticidade e excelente experiência para o dia a dia.`
        : 'Veículo confortável, prático e ideal para diferentes tipos de uso.';

      setFormData((prev) => ({
        ...prev,
        description: generated,
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.brand.trim() || !formData.model.trim()) return;

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      category: formData.category,
      pricePerDay: Number(formData.pricePerDay) || 0,
      imageUrl:
        formData.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
      description: formData.description.trim() || 'Veículo disponível para locação.',
      transmission: formData.transmission,
      seats: Number(formData.seats) || 5,
      isAvailable: true,
    };

    addVehicle(newVehicle);

    setFormData({
      brand: '',
      model: '',
      category: 'X',
      pricePerDay: '',
      imageUrl: '',
      description: '',
      transmission: 'Manual',
      seats: 5,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <PlusCircle className="text-red-500" size={22} />
            <h2 className="text-2xl font-bold text-gray-900">Adicionar Veículo</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Ex: BYD"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Ex: King"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
                >
                  <option value="X">X</option>
                  <option value="Comfort">Comfort</option>
                  <option value="Black">Black</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço/Dia (R$)
                </label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleInputChange}
                  disabled
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 text-gray-400 cursor-not-allowed"
                  placeholder="Em breve"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagem (URL)</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="https://..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                >
                  <Sparkles size={14} />
                  {isGenerating ? 'Gerando...' : 'Gerar com IA'}
                </button>
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Câmbio</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automático">Automático</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assentos</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  min={1}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Adicionar ao Catálogo
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Veículos Cadastrados ({vehicles.length})
            </h2>
          </div>

          <div>
            {vehicles.length === 0 ? (
              <div className="p-6 text-gray-500">Nenhum veículo cadastrado ainda.</div>
            ) : (
              vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between gap-4 px-6 py-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={vehicle.imageUrl}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />

                    <div className="min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {vehicle.brand} {vehicle.model}
                      </h3>

                      <p className="text-gray-500">
                        {vehicle.category}
                        {vehicle.pricePerDay > 0 ? ` • R$ ${vehicle.pricePerDay}/dia` : ''}
                      </p>

                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded-md text-sm font-medium ${
                          vehicle.isAvailable
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {vehicle.isAvailable ? 'Disponível' : 'Indisponível'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleAvailability(vehicle.id)}
                      className="text-gray-400 hover:text-gray-600 transition"
                      title={vehicle.isAvailable ? 'Desativar veículo' : 'Ativar veículo'}
                    >
                      {vehicle.isAvailable ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeVehicle(vehicle.id)}
                      className="text-red-400 hover:text-red-600 transition"
                      title="Remover veículo"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};