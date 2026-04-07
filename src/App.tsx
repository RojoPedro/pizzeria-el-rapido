import { useMenu } from '@/hooks/useMenu';
import { Header } from '@/sections/Header';
import { PizzeSection } from '@/sections/PizzeSection';
import { RotoliniSection } from '@/sections/RotoliniSection';
import { StuzzichiniSection } from '@/sections/StuzzichiniSection';
import { Footer } from '@/sections/Footer';
import { Loader2 } from 'lucide-react';

function App() {
  const { menu, loading, error } = useMenu();

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Caricamento menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-5xl mb-4">🍕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ops!</h2>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-500 text-sm mt-4">
            Ricarica la pagina per riprovare
          </p>
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-gray-600">Menu non disponibile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <main>
        {/* Hero section con mascotte */}
        <section className="bg-gradient-to-b from-red-700 to-red-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              {/* <img 
                src="/images/mascotte.png" 
                alt="Mascotte El Rapido" 
                className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
              /> */}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              La Pizza Più Veloce di Meolo! ⚡
            </h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Scopri il nostro menu con le migliori pizze, rotolini e stuzzichini. 
              Scegli il formato che preferisci!
            </p>
          </div>
        </section>

        {/* Sezioni menu */}
        <PizzeSection pizze={menu.pizze} />
        <RotoliniSection rotolini={menu.rotolini} />
        <StuzzichiniSection stuzzichini={menu.stuzzichini} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
