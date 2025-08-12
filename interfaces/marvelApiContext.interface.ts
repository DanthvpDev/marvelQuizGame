import { Character } from "./marvelApiResponse.interface";

export default interface MarvelApiParams {
    ts:number;
    apiKey: string;
    hash: string;
}


export interface MarvelApiContextType {
    characters: Character[];
    marvelApiError?: string;
    isLoading: boolean;
}