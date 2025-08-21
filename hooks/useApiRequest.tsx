/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiRequestHook from "@/interfaces/ApiRequestHook.interface";
import {
  APIResponse,
  Pokemon,
  PokemonResult,
  Result,
} from "@/interfaces/pokeApi.interface";
import { pokemonDTOMapper } from "@/mappers/apiMappers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useApiRequest(page: number): ApiRequestHook {
  // Tanstack hook for https://pokeapi.co/api/v2/pokemon
  const {
    data: apiData,
    error: apiDataError,
    isLoading: apiDataIsLoading,
    status: apiDataStatus,
  } = useQuery({
    queryKey: ["apiData"],
    queryFn: gettingAllResults,
  });

  //Tanstack hook for responses inside apiData
  const {
    data: pokemons,
    isLoading: isLoadingPokemons,
    error: pokemonsError,
    isFetching: pokemonsGotten,
    status: pokemonsStatus,
  } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => {
      const url = apiData?.at(page - 1)?.results;
      return url ? gettinPokemonsPerPage(url) : [];
    },
    enabled: !!apiData,
  });

  //* This function gets all the info of pokemons of each ApiResponse result
  async function gettinPokemonsPerPage(results: Result[]): Promise<Pokemon[]> {
    try {
      let pokemonsPromises = results.map(async (res) => {
        return await getPokemon(res.url);
      });

      const pokemonsArray = await Promise.all(pokemonsPromises);

      return pokemonsArray.filter(Boolean) as Pokemon[];
    } catch (error) {
      return [];
    }
  }

  //* Gets all the Api Responses using the recursive function
  //? This function is needed for tanstack query
  async function gettingAllResults() {
    try {
      //* Calls the function that executes axios request
      return getAllPokemonsRecursive(process.env.EXPO_PUBLIC_POKEAPI_URL);
    } catch (error) {
      return [];
    }
  }

  //* Gets pokemons from the URL given by the API Response
  async function getPokemon(endpoint: string): Promise<Pokemon | null> {
    try {
      const { data } = await axios.get<PokemonResult>(`${endpoint}`);
      return pokemonDTOMapper(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //* Returns all the API Responses with the response info and the Result array
  async function getApiPokemonResponse(
    endpoint: string
  ): Promise<APIResponse | null> {
    try {
      const { data } = await axios.get<APIResponse>(`${endpoint}`);
      if (data.results.length === 0 || !data) return null;
      else return data;
    } catch (error) {
      throw error;
    }
  }

  //* Gets all the Api Responses
  async function getAllPokemonsRecursive(
    url: string,
    prevArrayData?: APIResponse[]
  ): Promise<APIResponse[] | undefined> {
    let response = prevArrayData ? [...prevArrayData] : [];
    try {
      const apiCall = await getApiPokemonResponse(url);
      if (apiCall && apiCall.next) {
        response.push(apiCall);
        return await getAllPokemonsRecursive(apiCall.next, response);
      }
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return {
    getApiResponse: getApiPokemonResponse,
    getPokemon,
    gettinPokemonsPerPage,
    gettingAllResults,
    apiData,
    apiDataError,
    apiDataIsLoading,
    apiDataStatus,
    pokemons,
    isLoadingPokemons,
    pokemonsError,
    pokemonsGotten,
    pokemonsStatus
  };
}
