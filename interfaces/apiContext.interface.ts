import { Pokemon } from "./pokeApi.interface";

export interface PokeApiContextProvider {
    pokemons: Pokemon[],
    apiError: string|null; 
    isLoading: boolean;
}