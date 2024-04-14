import { PokemonListItem } from './pokemon-list-item';

export interface ApiResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonListItem[];
}
