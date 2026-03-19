import type { Pizza } from '@/types/menu';
import { PizzaCard } from './PizzaCard';
import { Flame } from 'lucide-react';

interface PizzeSectionProps {
  pizze: Pizza[];
}

export function PizzeSection({ pizze }: PizzeSectionProps) {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Titolo sezione */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-600 p-3 rounded-full">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Le Nostre Pizze</h2>
            <p className="text-gray-600 mt-1">
              Scegli il tuo formato preferito: Baby, Normale, Media o Maxi
            </p>
          </div>
        </div>

        {/* Griglia pizze */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizze.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </div>
    </section>
  );
}
