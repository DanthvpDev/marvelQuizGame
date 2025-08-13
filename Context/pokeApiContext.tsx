import { PokeApiContextProvider } from "@/interfaces/apiContext.interface";
import { APIResponse, Pokemon, Result } from "@/interfaces/pokeApi.interface";
import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
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
export default function MarvelApiProvider({ children }: PropsWithChildren) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [apiData, setApiData] = useState<Result[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiResponse = useRef<APIResponse>({} as APIResponse);
  const apiCurrentUrl = useRef<string>(`${process.env.EXPO_PUBLIC_POKEAPI_URL}offset=0&limit=100`);

  async function getPokemons(endpoint?: string) {
    setIsLoading(true);
    try {
      const { data } = await axios.get<APIResponse>(`${endpoint}`);
      if (data.results.length < 0 || !data) {
        setApiError("This pokeball is empty! Something happend with the data requested.")
      }
      else{
        data.results.forEach(element => {
          setApiData([...apiData, element]);
        });
        apiResponse.current = data;
      }
    } catch (error) {
      setApiError("Prepare for trouble! The connection has failed. Team Rocket must be behind this.")
    }
    finally {
      setIsLoading(false);
    }
  }

  // async function nextPage() {
  //   if(isLoading || apiResponse.current.next === "") return;

  //   try {
  //     apiCurrentUrl.current = apiResponse.current.next;
  //     await 

  //   } catch (error) {
      
  //   }
  // }

  return {};
}
