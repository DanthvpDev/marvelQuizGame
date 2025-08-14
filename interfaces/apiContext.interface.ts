import { Pokemon } from "./pokeApi.interface";

export interface PokeApiContextProvider {
    pokemons: Pokemon[],
    apiError: string|null; 
    isLoading: boolean;
    currentPage: number;
    maxPages:number;
    nextPage: ()=>void;

}