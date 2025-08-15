import { Pokemon, PokemonResult } from "@/interfaces/pokeApi.interface";

export function pokemonDTOMapper(pokemonResult: PokemonResult):Pokemon {
    const {id, name, sprites, abilities} = pokemonResult;
    return {
      id,
      name,
      image: sprites,
      abilities
    }
  }