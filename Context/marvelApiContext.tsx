 
import MarvelApiParams, { MarvelApiContextType } from "@/interfaces/marvelApiContext.interface";
import { Character, Data } from "@/interfaces/marvelApiResponse.interface";
import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Md5 } from "ts-md5";

const MARVEL_API_URL: string = "https://gateway.marvel.com/v1/public/";
const PUBLIC_API_KEY: string = "f894d3f3c96b3fc7a64a1cbf1e21ac53";
const PRIVATE_API_KEY: string = "9ab1ea430c46b1649960f409babd04ae4db38940";

function generateMarvelApiParams(
  publicKey: string,
  privateKey: string
): MarvelApiParams {
  const timeStamp = new Date().getTime();
  const hashString: string = timeStamp + privateKey + publicKey;
  const hash = Md5.hashStr(hashString);
  console.log("hash", hash);
  console.log("time", timeStamp);
  console.log("public", publicKey);
  console.log("private", privateKey);

  return {
    ts: timeStamp,
    apiKey: publicKey,
    hash,
  };
}


const MARVEL_API_CONTEXT = createContext<MarvelApiContextType>({} as MarvelApiContextType);

export const useMarvelApiContextProvider = ():MarvelApiContextType => {
    const CONTEXT = useContext(MARVEL_API_CONTEXT);
    if(!CONTEXT) throw new Error("useMarvelApiContextProvider cannot be used outside the provider.");
    return CONTEXT;
} 

export default function MarvelApiProvider({children}:PropsWithChildren) {
  const [apiData, setApiData] = useState<Character[]>([]);
  const [apiError, setApiError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //This function builds the API Query
  function buildApiQuery(endpoint: string = "characters"): string {
    const {apiKey, hash, ts} = generateMarvelApiParams(PUBLIC_API_KEY, PRIVATE_API_KEY);
    return `${MARVEL_API_URL + endpoint}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  }

  useEffect(() => {
    async function getMarvelData(): Promise<boolean> {
      setIsLoading(true);
      let flag;
      try {
        const URL = buildApiQuery("characters");
        console.log(URL);
        const { data } = await axios.get<Data>(URL);
        if (data.results.length > 0) {
          setApiData([]);
          setApiError("");
          flag = false;
        } else {
          setApiData(data.results);
          setApiError(undefined);
          flag = true;
        }
      } catch (error) {
        setApiData([]);
        setApiError(
          "Looks like Doctor Doom is messing with the servers. Try again later."
        );
        console.log(error);
        flag = false;
      } finally {
        setIsLoading(false);
      }
      return flag;
    }

    getMarvelData();
  }, []);

  return (
    <MARVEL_API_CONTEXT.Provider 
        value={{
            characters: apiData,
            marvelApiError: apiError,
            isLoading
        }}>
        {children}
    </MARVEL_API_CONTEXT.Provider>
  );
}
