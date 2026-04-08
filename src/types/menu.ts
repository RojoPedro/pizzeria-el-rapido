export interface PrezziPizza {
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

export type FormatoPizza = 'normale' | 'media' | 'maxi';

export const formatiLabels: Record<FormatoPizza, string> = {
  normale: 'Normale',
  media: 'Media',
  maxi: 'Maxi'
};
