
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PokemonDetails, PokemonType } from './pokemon-model'; // Asegúrate de importar las interfaces aquí

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 150): Observable<PokemonDetails[]> {
    return this.http.get<{ results: any[] }>(`${this.apiUrl}?limit=${limit}`).pipe(
      mergeMap(response => {
        const detailsRequests = response.results.map(pokemon =>
          this.http.get<PokemonDetails>(pokemon.url)
        );
        return forkJoin(detailsRequests);
      })
    );
  }
}