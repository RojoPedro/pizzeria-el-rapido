import { Phone, MapPin, Clock } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo e Mascotte */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="/images/logonuovo.png" 
                alt="Logo El Rapido" 
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full drop-shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                EL RAPIDO
              </h1>
              <p className="text-red-100 text-sm md:text-base font-medium">
                Pizzeria dal 1990
              </p>
            </div>
          </div>

          {/* Info contatti */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2 bg-red-800/50 px-4 py-2 rounded-full">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">0421 345651</span>
            </div>
            <div className="flex items-center gap-2 bg-red-800/50 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span>Via Pio X 33, Meolo</span>
            </div>
            <div className="flex items-center gap-2 bg-red-800/50 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>17:30 - 21:15</span>
            </div>
          </div>
        </div>
      </div>  
    </header>
  );
}
