import { Component, Input } from '@angular/core';
import { PokemonDetails } from '../pokemon-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() capturedPokemons: PokemonDetails[] = [];
}
