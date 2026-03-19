import { useState, useEffect } from 'react';
import type { MenuData } from '@/types/menu';

export function useMenu() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/menu.json');
        if (!response.ok) {
          throw new Error('Errore nel caricamento del menu');
        }
        const data: MenuData = await response.json();
        setMenu(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menu, loading, error };
}
