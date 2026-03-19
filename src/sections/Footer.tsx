import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info pizzeria */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/images/mascotte.png" 
                alt="Mascotte El Rapido" 
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-2xl font-bold">EL RAPIDO</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La pizza più veloce della città! Dal 1990 portiamo in tavola 
              le migliori pizze, cotte nel forno a legna con ingredienti freschi 
              e di qualità.
            </p>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Contatti</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-red-500" />
                <span>0123 456789</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Via Roma 123, Milano</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-red-500" />
                <span>Tutti i giorni 19:00 - 23:30</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Seguici</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              #ElRapido #Pizza #Milano
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 El Rapido Pizzeria. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
