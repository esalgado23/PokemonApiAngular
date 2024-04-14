// src/app/models/pokemon.model.ts
export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string;
          }
        }
      }
    }
  };
  types: any[];
  isCaptured?: boolean;  // Agrega esta línea
}
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;


  export interface PokemonSprites {
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string;
          }
        }
      }
    }
  }
  
  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }