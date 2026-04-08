import { useState, useEffect } from 'react';
import type { MenuData, Pizza } from '@/types/menu';

export function useMenu() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Fetch static menu data (rotolini, stuzzichini)
        const localResponse = await fetch('/menu.json');
        if (!localResponse.ok) {
          throw new Error('Errore nel caricamento del menu locale');
        }
        const localData: MenuData = await localResponse.json();

        // Fetch pizze from backend
        const apiResponse = await fetch('https://elrapido-backend-production.up.railway.app/api/pizze', {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!apiResponse.ok) {
          throw new Error('Errore nel caricamento delle pizze dal backend');
        }
        
        const apiData = await apiResponse.json();
        
        // Map backend pizze to local Pizza interface
        const apiPizze: Pizza[] = apiData.data
          .filter((p: any) => p.is_visible)
          .map((p: any) => ({
            id: p.id,
            nome: p.nome,
            descrizione: p.ingredienti.join(', '),
            ingredienti: p.ingredienti,
            prezzi: {
              normale: parseFloat(p.prezzi.normale),
              media: parseFloat(p.prezzi.media),
              maxi: parseFloat(p.prezzi.maxi)
            }
          }));

        setMenu({
          ...localData,
          pizze: apiPizze.length > 0 ? apiPizze : localData.pizze
        });
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
