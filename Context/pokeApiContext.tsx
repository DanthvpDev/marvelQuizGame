import useApiRequest from "@/hooks/useApiRequest";
import { PokeApiContextProvider } from "@/interfaces/apiContext.interface";
import { Pokemon, Result } from "@/interfaces/pokeApi.interface";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const POKE_CONTEXT = createContext<PokeApiContextProvider | null>(
  {} as PokeApiContextProvider
);

export const usePokeApiContext = (): PokeApiContextProvider => {
  const context = useContext(POKE_CONTEXT);
  if (!context)
    throw new Error("Api Context cannot be used outside the Provider");
  return context;
};

//* Provider
export default function PokemonApiProvider({ children }: PropsWithChildren) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [apiData, setApiData] = useState<Result[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pokemonsPerPage = 62;
  //* Hook where APIRequest function is implemented
  const { getApiResponse, getAllPokemonsRecursive, getPokemon } = useApiRequest();
  const currentPage = useRef<number>(1);
  const maxPages = useRef<number>(0);

  function nextPage() {
    // Avoid calling the function while loading data 
    if(isLoading) return;
    setIsLoading(true);
    const dataLength = apiData.length; 
    if(dataLength > 0){
      const lastIndex:number = (currentPage.current * pokemonsPerPage)+1;
      const firstIndex = currentPage.current === 1 ? 0 : lastIndex-pokemonsPerPage;
      const pokemonsToGet = apiData.slice(firstIndex, lastIndex);
      
      //If the pokemons data length is lower than the last index calculated;
      if(pokemons.length < lastIndex) {
        try {
          pokemonsToGet.forEach(async obj => {
          let data = await getPokemon(obj.name);
          if(data) setPokemons(prev => [...prev, data]);
        }); 
        } catch (error) {
          setApiError("Prepare for trouble! The connection has failed. Team Rocket must be behind this.");
          return; 
        }
      }
    }
    else {
      setApiError("Oh no! There are not pokemons here!");
    }
  }

  useEffect(() => {
    
    //? This function sets API info on states
    async function getAllPokemonsUrls(endpoint: string) {
      setIsLoading(true);
      try {
        const data = await getApiResponse(endpoint);
        if (!data) setApiError("This pokeball is empty! Something happend with the data requested.");
        else {
          
          //* Setting the previous and next links from the response for use it on the next and prev buttons later
          let apiResponse:Result[]|undefined = [];
          if(data.next !== null){
            apiResponse = await getAllPokemonsRecursive(data, data.results);
            if(apiResponse) {
              setApiData(apiResponse);
              setApiError(null);
            }
            else {
              setApiError("Oh god! Apparently Team Rocket took the data away. Try again later!");
            };
          }
        }
      } 
      catch (error) {
        setApiError("Prepare for trouble! The connection has failed. Team Rocket must be behind this.");
        throw error;
      } 
      finally{setIsLoading(false)}
    }
    
    getAllPokemonsUrls(process.env.EXPO_PUBLIC_POKEAPI_URL);
    maxPages.current = Math.floor(apiData.length / pokemonsPerPage);
    
  }, []);

  return (
    <POKE_CONTEXT.Provider
    value={{
    apiError,
    pokemons,
    isLoading,
    currentPage: currentPage.current,
    maxPages: maxPages.current,
    nextPage

  }}
    >
      {children}
    </POKE_CONTEXT.Provider>
  )
}
