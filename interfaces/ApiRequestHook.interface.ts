import { APIResponse, Pokemon, Result } from "./pokeApi.interface";

export default interface ApiRequestHook {
    getApiResponse: (endpoint:string)=>Promise<APIResponse|null>;
    getPokemon: (endpoint:string)=>Promise<Pokemon|null>;
    gettinPokemonsPerPage: (results: Result[]) => Promise<Pokemon[]>;
    apiData?: APIResponse[]|null;
    apiDataError: Error|null;
    apiDataIsLoading: boolean;
    apiDataStatus: "pending"|"error"|"success";
    gettingAllResults: ()=>void


}