import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PokemonService } from '../pokemon.service';
import { PokemonDetails } from '../pokemon-model';  
import { HeaderComponent } from '../header/header.component';
import { ChangeDetectorRef } from '@angular/core';

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
  currentNameFilter: string = '';
  currentTypeFilter: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(HeaderComponent, { static: false }) headerComponent!: HeaderComponent;

  
 
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.updateHeaderComponent();
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
  

  createFilter(): (data: PokemonDetails, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
             (searchTerms.type ? data.types.some(t => t.type.name.toLowerCase().indexOf(searchTerms.type.toLowerCase()) !== -1) : true);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentNameFilter = filterValue;
    this.applyFilters();
  }

  applyTypeFilter(type: string): void {
    this.currentTypeFilter = type;
    this.applyFilters();
  }

  applyFilters(): void {
    this.dataSource.filter = JSON.stringify({
      name: this.currentNameFilter,
      type: this.currentTypeFilter
    });
  }



  updateHeaderComponent() {
    if (this.headerComponent) {
        this.headerComponent.capturedPokemons = this.capturedPokemons;
    }
}

togglePokemon(pokemon: PokemonDetails): void {
  const index = this.capturedPokemons.findIndex(p => p.id === pokemon.id);
  if (index === -1) {
      if (this.capturedPokemons.length >= 6) {
          this.capturedPokemons.shift(); 
      }
      this.capturedPokemons.push(pokemon); 
  } else {
      this.capturedPokemons.splice(index, 1); 
  }
  this.updateHeaderComponent();
}

  isCaptured(pokemon: PokemonDetails): boolean {
    return this.capturedPokemons.some(p => p.id === pokemon.id);
  }


  

}
