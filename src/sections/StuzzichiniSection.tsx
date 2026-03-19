import type { Stuzzichino } from '@/types/menu';
import { SimpleItemCard } from './SimpleItemCard';
import { Cookie } from 'lucide-react';

interface StuzzichiniSectionProps {
  stuzzichini: Stuzzichino[];
}

export function StuzzichiniSection({ stuzzichini }: StuzzichiniSectionProps) {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Titolo sezione */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-600 p-3 rounded-full">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Stuzzichini</h2>
            <p className="text-gray-600 mt-1">
      Finger food perfetti per accompagnare la tua pizza
            </p>
          </div>
        </div>

        {/* Griglia stuzzichini */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stuzzichini.map((stuzzichino) => (
            <SimpleItemCard key={stuzzichino.id} item={stuzzichino} type="stuzzichino" />
          ))}
        </div>
      </div>
    </section>
  );
}
