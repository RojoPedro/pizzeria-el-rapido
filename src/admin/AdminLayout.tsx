import { Link, useLocation } from 'react-router-dom';
import { LogOut, Pizza, Leaf, ArrowLeft } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const location = useLocation();

  const links = [
    { path: '/admin/pizze', name: 'Gestione Pizze', icon: <Pizza className="w-5 h-5" /> },
    { path: '/admin/ingredienti', name: 'Gestione Ingredienti', icon: <Leaf className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">El Rapido CMS</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-red-50 text-red-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link
            to="/"
            className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna al Sito
          </Link>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Esci
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
