import { useState } from 'react';
import type { Pizza, FormatoPizza } from '@/types/menu';
import { formatiLabels } from '@/types/menu';
import { PizzaIcon } from 'lucide-react';

interface PizzaCardProps {
  pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const [formatoSelezionato, setFormatoSelezionato] = useState<FormatoPizza>('normale');

  const formati: FormatoPizza[] = ['normale', 'media', 'maxi'];

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        {/* Header card */}
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-red-100 p-2 rounded-full">
            <PizzaIcon className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{pizza.nome}</h3>
            <p className="text-gray-600 text-sm mt-1">{pizza.descrizione}</p>
          </div>
        </div>

        {/* Ingredienti */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
            Ingredienti
          </p>
          <div className="flex flex-wrap gap-1.5">
            {pizza.ingredienti.map((ingrediente, index) => (
              <span 
                key={index}
                className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-full border border-amber-200"
              >
                {ingrediente}
              </span>
            ))}
          </div>
        </div>

        {/* Selettore formato */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
            Scegli il formato
          </p>
          <div className="grid grid-cols-4 gap-2">
            {formati.map((formato) => (
              <button
                key={formato}
                onClick={() => setFormatoSelezionato(formato)}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  formatoSelezionato === formato
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {formatiLabels[formato]}
              </button>
            ))}
          </div>
        </div>

        {/* Prezzo */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Formato <span className="font-semibold text-gray-700">{formatiLabels[formatoSelezionato]}</span>
          </span>
          <span className="text-2xl font-bold text-red-600">
            €{pizza.prezzi[formatoSelezionato].toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
