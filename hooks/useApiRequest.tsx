import ApiRequestHook from "@/interfaces/ApiRequestHook.interface";
import { APIResponse, Pokemon, PokemonResult, Result } from "@/interfaces/pokeApi.interface";
import axios from "axios";

export default function useApiRequest(): ApiRequestHook {

  function pokemonDTOMapper(pokemonResult: PokemonResult):Pokemon {
    const {id, name, sprites, abilities} = pokemonResult;
    return {
      id,
      name,
      image: sprites,
      abilities
    }
  }

  async function getPokemon(endpoint:string):Promise<Pokemon|null> {
    try {
      const {data} = await axios.get<PokemonResult>(`${endpoint}`);
      return pokemonDTOMapper(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getApiPokemonResponse(endpoint: string): Promise<APIResponse | null> {
    try {
      const { data } = await axios.get<APIResponse>(`${endpoint}`);
      if (data.results.length === 0 || !data) return null;
      else return data;
    } catch (error) {
      throw error;
    }
  }

  //* Recursive function to get all pokemons
  async function getAllPokemonsRecursive(data: APIResponse,prevArrayData: Result[]): Promise<Result[]|undefined> {
    let response = [...prevArrayData];
    try {
      if (data.next) {
        let dataNewRequest = await getApiPokemonResponse(data.next);
        if (dataNewRequest) {
          response = response.concat(dataNewRequest.results);
          return await getAllPokemonsRecursive(dataNewRequest, response)
        }
      }
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return {
    getApiResponse: getApiPokemonResponse,
    getAllPokemonsRecursive,
    getPokemon
  };
}
