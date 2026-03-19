import type { Rotolino, Stuzzichino } from '@/types/menu';
import { Croissant, Cookie } from 'lucide-react';

interface SimpleItemCardProps {
  item: Rotolino | Stuzzichino;
  type: 'rotolino' | 'stuzzichino';
}

export function SimpleItemCard({ item, type }: SimpleItemCardProps) {
  const Icon = type === 'rotolino' ? Croissant : Cookie;
  const bgColor = type === 'rotolino' ? 'bg-orange-100' : 'bg-green-100';
  const iconColor = type === 'rotolino' ? 'text-orange-600' : 'text-green-600';
  const priceColor = type === 'rotolino' ? 'text-orange-600' : 'text-green-600';

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        {/* Header card */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`${bgColor} p-2 rounded-full`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{item.nome}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.descrizione}</p>
          </div>
        </div>

        {/* Prezzo */}
        <div className="flex items-center justify-end pt-3 border-t border-gray-100">
          <span className={`text-2xl font-bold ${priceColor}`}>
            €{item.prezzo.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
