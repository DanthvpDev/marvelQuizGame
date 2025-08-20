 
import { Pokemon } from "@/interfaces/pokeApi.interface";
import { useEffect, useState } from "react";
import useApiRequest from "./useApiRequest";


/*
 ? pokemonsForGame: 4 pokemons selected to use them on the board
 ? answer: pokemon of the list selected
 ? pokemonsError: it would have any error explanation
 ? startGame: method that gets a random page of apiData
 ? isAnswerCorrect: method that checks if the user option is the same as the answer
*/ 

interface Returns {
  pokemonsForGame: Pokemon[];
  answer?: Pokemon;
  pokemonsError: string|null;
  pokemonsGotten: boolean;
  startGame: ()=>void;
  isAnswerCorrect: (correctAnswer: Pokemon, optionSelected: string) => boolean;
}

export default function useGame(): Returns {
  const [page, setPage] = useState<number>(0);
  const [pokemonsForGame, setPokemonsForGame] = useState<Pokemon[]>([]);
  const [answer, setAnswer] = useState<Pokemon>();
  const [pokemonsForGameError, setPokemonsForGameError] = useState<string | null>(null);

  // Api Context
  const { apiData, pokemons, pokemonsStatus, pokemonsGotten } = useApiRequest(page);

  // Gets a random page number
  function getPokemonsPageRandom(maxPages: number): number {
    return Math.floor(Math.random() * maxPages);
  }

  // Gets the pokmemons randomly a list of 4 pokemons
  function gettingPokemonsRandomly(data: Pokemon[], amountOptions: number) {
    let i = 0;
    let response: Pokemon[] = [];
    const filteredData = data.filter(e => e.image.front_default); // Filters the pokemons that have images (some pokemons doesn't have any img)

    while (i < amountOptions && filteredData.length > 0) {
      let random = Math.floor(Math.random() * filteredData.length);
      let selected = filteredData.at(random);
      if (selected && !response.find((e) => e.id === selected.id)) {
        response.push(selected);
        i++;
      }
    }
    return response;
  }

  // Starts the game by getting a new page that triggers the useEffect
  function startGame() {
    const newPage = apiData && getPokemonsPageRandom(apiData?.length);
    if(!newPage) return  setPokemonsForGameError("Oops! It looks like Charizard sneezed and burned the data. Please try again, Trainer.");
    newPage && setPage(newPage);
  }
  
  // Checks if the answer is correct
  function isAnswerCorrect(correctAnswer: Pokemon, optionSelected: string): boolean {
    return correctAnswer.name === optionSelected;
  }


  useEffect(() => {
    if (pokemonsStatus === "error") {
      setPokemonsForGameError("Oops! It looks like Charizard sneezed and burned the data 🔥. Please try again, Trainer.");
      return;
    }

    if (pokemons && pokemons.length > 0) {
      const options = 4;
      const selectedPokemons = gettingPokemonsRandomly(pokemons, options);
      const correctAnswer =
        selectedPokemons[Math.floor(Math.random() * selectedPokemons.length)];

      setPokemonsForGame(selectedPokemons);
      setAnswer(correctAnswer);
      setPokemonsForGameError(null);
    }
  }, [pokemons, pokemonsStatus]);

  

  return {
    pokemonsForGame,
    answer,
    isAnswerCorrect,
    pokemonsError: pokemonsForGameError,
    startGame,
    pokemonsGotten
  };
}


