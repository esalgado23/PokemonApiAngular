import { PokemonTypeNamesPipe } from './pokemon-type-names.pipe';

describe('PokemonTypeNamesPipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonTypeNamesPipe();
    expect(pipe).toBeTruthy();
  });
});
