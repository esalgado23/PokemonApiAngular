// src/app/header/header.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonDetails } from '../pokemon-model';
import { PokemonCaptureService } from '../pokemon-capture-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  capturedPokemons: PokemonDetails[] = [];
  private subscriptions = new Subscription();

  constructor(private pokemonCaptureService: PokemonCaptureService) {
    this.subscriptions.add(this.pokemonCaptureService.capturedPokemons$.subscribe(
      pokemons => {
        this.capturedPokemons = pokemons;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
