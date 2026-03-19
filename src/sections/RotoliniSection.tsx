import type { Rotolino } from '@/types/menu';
import { SimpleItemCard } from './SimpleItemCard';
import { Croissant } from 'lucide-react';

interface RotoliniSectionProps {
  rotolini: Rotolino[];
}

export function RotoliniSection({ rotolini }: RotoliniSectionProps) {
  return (
    <section className="py-12 px-4 bg-amber-50">
      <div className="container mx-auto max-w-6xl">
        {/* Titolo sezione */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-orange-500 p-3 rounded-full">
            <Croissant className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Rotolini</h2>
            <p className="text-gray-600 mt-1">
              Deliziosi rotolini di pizza ripieni, perfetti per iniziare
            </p>
          </div>
        </div>

        {/* Griglia rotolini */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rotolini.map((rotolino) => (
            <SimpleItemCard key={rotolino.id} item={rotolino} type="rotolino" />
          ))}
        </div>
      </div>
    </section>
  );
}
