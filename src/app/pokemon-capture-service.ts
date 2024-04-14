// src/app/services/pokemon-capture.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonDetails } from '../app/pokemon-model';

@Injectable({
    providedIn: 'root'
  })
  export class PokemonCaptureService {
    private capturedPokemonsSource = new BehaviorSubject<PokemonDetails[]>([]);
    capturedPokemons$ = this.capturedPokemonsSource.asObservable();
  
    constructor() {}
  
    capturePokemon(pokemon: PokemonDetails) {
      const currentPokemons = this.capturedPokemonsSource.value;
      if (!currentPokemons.some(p => p.id === pokemon.id)) {
        this.capturedPokemonsSource.next([...currentPokemons, pokemon]);
      }
    }
  
    releasePokemon(pokemonId: number) {
      const updatedPokemons = this.capturedPokemonsSource.value.filter(p => p.id !== pokemonId);
      this.capturedPokemonsSource.next(updatedPokemons);
    }
  
    setCapturedPokemons(pokemons: PokemonDetails[]) {
      this.capturedPokemonsSource.next(pokemons);
    }
  
    isCaptured(pokemonId: number): boolean {
      return this.capturedPokemonsSource.value.some(pokemon => pokemon.id === pokemonId);
    }
  }