/* eslint-disable react-hooks/exhaustive-deps */
import { Pokemon } from "@/interfaces/pokeApi.interface";
import { useEffect, useState } from "react";
import useApiRequest from "./useApiRequest";

interface Returns {
  pokemonsForGame: Pokemon[];
  answer?: Pokemon;
  isAnswerCorrect: (correctAnswer: Pokemon, optionSelected: string) => boolean;
  pokemons?: Pokemon[];
  pokemonsError: string|null;
  startGame: ()=>void;
}

export default function useGame(): Returns {
  //Manages pagination of the pokemons ApiRequest
  const [page, setPage] = useState<number>(0);
  // List of pokemons are is going to be sent to the component
  const [pokemonsForGame, setPokemonsForGame] = useState<Pokemon[]>([]);
  // Correct answer
  const [answer, setAnswer] = useState<Pokemon>();
  // Error message
  const [pokemonsForGameError, setPokemonsForGameError] = useState<string | null>(null);
  // Context of requests
  const { pokemons, apiData, pokemonsStatus, pokemonsGotten } = useApiRequest(page);
  


  // This returns a random number for the pagination
  function getPokemonsPageRandom(responsesLength: number): number {
    const page = Math.floor(Math.random() * responsesLength);
    return page;
  }

  // This gets pokemons info randomly
  function gettingPokemonsRandomly(data: Pokemon[], amountOptions: number) {
    let i = 0;
    let response: Pokemon[] = [];
    if (!data || !apiData) return [];

    setPage(getPokemonsPageRandom(data.length));

    while (i < amountOptions) {
      let random = Math.floor(Math.random() * data.length);
      let filteredData = data.filter(e=> e.image.front_default);
      let selected = filteredData.at(random);
      if (selected) {
        if (!response.find((e) => e.id === selected.id)) {
          response.push(selected);
          i++;
        }
      }
    }
    console.log(" ");
    return response;
  }

  // This sets the game
  function startGame() {
    if (pokemonsStatus === "error")
      return setPokemonsForGameError(
    "Looks like Charizard just sneezed. 🤧 \n Your request got caught in a temporary server flame-out.\n Try again after the smoke clears. 🔥"
  );
  if(pokemons && pokemons?.length > 0){
    const options = 4;
    let selectedPokemons = gettingPokemonsRandomly(pokemons, options);
    let random = Math.floor(Math.random() * selectedPokemons.length);
    let correctAnswer = selectedPokemons.at(random);
    setPokemonsForGame(selectedPokemons);
    setAnswer(correctAnswer);
    setPokemonsForGameError(null);
  }
  console.log(pokemons?.length);
  console.log(pokemonsGotten);
}

  // This checks the user answer is correct
  function isAnswerCorrect(
    correctAnswer: Pokemon,
    optionSelected: string
  ): boolean {
    return correctAnswer.name === optionSelected;
  }

  
  

  useEffect(() => {

    startGame(); 

  }, [])
  

  return {
    pokemonsForGame,
    answer,
    isAnswerCorrect,
    pokemonsError:pokemonsForGameError,
    startGame
  };
}
