import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PokemonService } from '../pokemon.service';
import { PokemonDetails } from '../pokemon-model';  

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css']
})
export class PokemonGridComponent implements OnInit {
  displayedColumns: string[] = ['number', 'image', 'name', 'type'];
  dataSource = new MatTableDataSource<PokemonDetails>();
  capturedPokemons: PokemonDetails[] = [];
  uniqueTypes: string[] = [];  
  maxCaptures = 6;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
    this.dataSource.paginator = this.paginator;
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons().subscribe((pokemons: PokemonDetails[]) => {
      this.dataSource.data = pokemons.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default,
        types: pokemon.types,
        sprites: pokemon.sprites
      }));
      this.uniqueTypes = Array.from(new Set(pokemons.flatMap(pokemon => 
        pokemon.types.map(type => type.type.name)
      )));
    });
  }
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyTypeFilter(type: string): void {
    if (type) {
      this.dataSource.filterPredicate = (data: PokemonDetails, filter: string) => 
        data.types.some(t => t.type.name.toLowerCase().includes(filter.toLowerCase()));
      this.dataSource.filter = type;
    } else {
      this.dataSource.filter = ''; 
    }
  }
  
  




  togglePokemon(pokemon: PokemonDetails): void {
    const index = this.capturedPokemons.findIndex(p => p.id === pokemon.id);
    if (index === -1) {
      if (this.capturedPokemons.length >= this.maxCaptures) {
        this.capturedPokemons.shift();  // Remove the oldest Pokemon if the max is reached
      }
      this.capturedPokemons.push(pokemon);  // Capture new Pokemon
    } else {
      this.capturedPokemons.splice(index, 1);  // Release captured Pokemon
    }
  }

  isCaptured(pokemon: PokemonDetails): boolean {
    return this.capturedPokemons.some(p => p.id === pokemon.id);
  }


  

}
