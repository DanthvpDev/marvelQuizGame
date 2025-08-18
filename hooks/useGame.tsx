import { Pokemon } from "@/interfaces/pokeApi.interface";
import { useState } from "react";
import useApiRequest from "./useApiRequest";

interface Returns {
    pokemonsForGame: Pokemon[];
    answer?: Pokemon;
    startGame: ()=> boolean;
    isAnswerCorrect: (correctAnswer:Pokemon, optionSelected:string) => boolean;
    pokemons?: Pokemon[]
}

export default function useGame(): Returns {
    const [page, setPage] = useState<number>(0);
    const {pokemons, apiData} = useApiRequest(page);
    const [pokemonsForGame, setPokemonsForGame] = useState<Pokemon[]>([]);
    const [answer, setAnswer] = useState<Pokemon>();


    function getPokemonsPageRandom(responsesLength:number):number {
        const page = Math.floor(Math.random() * responsesLength);
        return page
    }  

    function gettingPokemonsRandomly(data: Pokemon[], amountOptions:number) {
        let response:Pokemon[] = [];
        let i = 0;
        if(!data || !apiData) return [];

        setPage(getPokemonsPageRandom(data.length));
        
        while(i < amountOptions){
            let random = Math.floor(Math.random() * data.length);
            let selected = data.at(random);
            if(selected && selected.image.front_default) {
                if(!response.find(e => e.id === selected.id)){
                    response.push(selected);
                    i++;
                }
            };

        }
        return response;
        
    }


    function startGame() {
        if(pokemons && pokemons.length > 0) {
            const options = 4;
            let selectedPokemons = gettingPokemonsRandomly(pokemons, options);
            let random = Math.floor(Math.random() * selectedPokemons.length); 
            let correctAnswer = selectedPokemons.at(random);
            setPokemonsForGame(selectedPokemons);
            setAnswer(correctAnswer);
            return true;
        }
        else return false;
    }
    
    function isAnswerCorrect(correctAnswer:Pokemon, optionSelected:string):boolean {
        return correctAnswer.name ===  optionSelected;
    }


    return {
        pokemonsForGame,
        startGame,
        answer,
        isAnswerCorrect
        
  }
}