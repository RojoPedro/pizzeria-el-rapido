export interface PrezziPizza {
  baby: number;
  normale: number;
  media: number;
  maxi: number;
}

export interface Pizza {
  id: number;
  nome: string;
  descrizione: string;
  ingredienti: string[];
  prezzi: PrezziPizza;
}

export interface Rotolino {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
}

export interface Stuzzichino {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
}

export interface MenuData {
  pizze: Pizza[];
  rotolini: Rotolino[];
  stuzzichini: Stuzzichino[];
}

export type FormatoPizza = 'baby' | 'normale' | 'media' | 'maxi';

export const formatiLabels: Record<FormatoPizza, string> = {
  baby: 'Baby',
  normale: 'Normale',
  media: 'Media',
  maxi: 'Maxi'
};
