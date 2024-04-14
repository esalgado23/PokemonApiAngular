import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeNames'
})
export class PokemonTypeNamesPipe implements PipeTransform {
  transform(types: { slot: number; type: { name: string; url: string } }[]): string {
    return types.map(t => t.type.name).join(', ');
  }
}
