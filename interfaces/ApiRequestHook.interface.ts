import { APIResponse, Pokemon, Result } from "./pokeApi.interface";

export default interface ApiRequestHook {
    getApiResponse: (endpoint:string)=>Promise<APIResponse|null>;
    getPokemon: (endpoint:string)=>Promise<Pokemon|null>;
    getAllPokemonsRecursive: (data:APIResponse, prevArrayData: Result[])=>Promise<Result[]|undefined>;
}