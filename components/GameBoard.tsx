import { useAuthContext } from "@/Context/AuthContext";
import useGame from "@/hooks/useGame";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import CharizardError from "../assets/pokemonContent/charizardError.png";
import ResultsGameBoard from "./ResultsGameBoard";

interface BoardProps {
  haveButtons?: boolean;
  onPress: React.Dispatch<React.SetStateAction<number>>;
  points: number;
  level: number;
}

export default function GameBoard({
  haveButtons,
  onPress,
  points,
  level,
}: BoardProps) {
  const [optionSelected, setOptionSelected] = useState<string>();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueError, setInputValueError] = useState<string|null>(null);
  const [error, setError] = useState<string | null>(null);
  const { pokemonsForGame, startGame, answer, isAnswerCorrect } = useGame();
  //? Gets the user
  const { user } = useAuthContext();

  const handleRestart = () => {
    let res: boolean = startGame();
    if (res) {
      setError(null);
      onPress(0);
    } else
      setError("Looks like Charizard just sneezed. 🤧 \n Your request got caught in a temporary server flame-out.\n Try again after the smoke clears. 🔥");
  };

  useEffect(() => {
    handleRestart();
  }, []);

  useEffect(() => {

    function handleAnswer() {
      //* Error handlign for input
      if(level === 2) {
        if(inputValue.length < 1) return setInputValueError("Enter the pokemon name");
        
        setInputValueError(null);
      }

      //* Verifies if the correct answer and the option selected are the same
      if ((answer && optionSelected) && isAnswerCorrect(answer, optionSelected)) {
        onPress((p) => p + 1);
        startGame();
      } else onPress(0);
      setOptionSelected(undefined);
    }

    handleAnswer();
  }, [optionSelected]);

  if(error) 
    return (
      <View>
        <View className="h-96">
          <Image
            source={CharizardError}
            className="h-full aspect-square rounded-xl self-center shadow-xl shadow-pokeRed"
          />
        </View>
        <Text className="py-5 mt-5 bg-pokeRed shadow-lg shadow-pokeRed-300 text-center font-bold text-xl text-pokeWhite-500 rounded-xl">{error}</Text>
        <Pressable
          onPress={() => router.push("/game/")}
          className=" mt-5 self-center z-10 bg-pokeBlue dark:bg-pokeWhite-500 pt-2 pb-1 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-36"
        >
          <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
            Home
          </Text>
        </Pressable>
      </View>
    )

  return (
    <View>
      <View className="mb-10 flex flex-row justify-between">
        <Pressable
          onPress={() => router.push("/game/")}
          className="z-10 bg-pokeBlue dark:bg-pokeWhite-500 pt-2 pb-1 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-36"
        >
          <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={handleRestart}
          className="z-10 bg-pokeBlue dark:bg-pokeWhite-500 pt-2 pb-1 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-36"
        >
          <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
            Restart
          </Text>
        </Pressable>
      </View>
      <ResultsGameBoard
        username={user?.username ? user.username : "player"}
        points={points}
        level={level}
      />
      <View className="border-2 border-pokeYellow-700 flex flex-col items-center justify-evenly py-3 rounded-b-xl">
        {answer && (
          <Image
            src={answer?.image.front_default}
            className="h-3/6 aspect-square border-2 border-pokeYellow-700 dark:bg-pokeWhite bg-pokeBlue/65 rounded-xl"
          />
        )}
        {haveButtons ? (
          <View className="w-11/12 flex flex-row flex-wrap justify-around gap-6">
            {pokemonsForGame &&
              pokemonsForGame.map((p) => (
                <Pressable
                  onPress={() => setOptionSelected(p.name)}
                  key={p.id}
                  className="z-10 bg-pokeBlue dark:bg-pokeYellow-800 py-3 justify-center rounded-xl active:bg-pokeBlue-800/50 border-4 border-pokeBlue-800 dark:border-pokeWhite w-2/5"
                >
                  <Text className="font-bold text-xl text-pokeWhite-500 text-center shadow-md shadow-pokeBlue-800">
                    {p.name}
                  </Text>
                </Pressable>
              ))}
          </View>
        ) : (
          <View className="w-8/12 flex flex-col items-center gap-6">
            <TextInput
              onChangeText ={(text)=> setInputValue(text)}
              placeholder="Enter pokemon name"
              returnKeyLabel="done"
              returnKeyType="done"
              className="placeholder:text-pokeWhite/70 w-full pt-1 pb-2 bg-pokeBlue/65 dark:bg-pokeYellow-700/65 rounded-lg text-xl pl-2 text-pokeWhite border-2 border-pokeYellow"
            />
            {
              inputValueError && <Text className="w-full py-5 bg-pokeRed shadow-lg shadow-pokeRed-300 text-center font-bold text-xl text-pokeWhite-500 rounded-xl">{inputValueError}</Text>
            }
            <Pressable
              onPress={() => {
                setOptionSelected(inputValue);
              }}
              className="z-10 bg-pokeBlue dark:bg-pokeYellow-700 pt-3 pb-2 rounded-xl active:bg-pokeBlue-800/50 border-4 border-pokeBlue-800 dark:border-pokeWhite w-40"
            >
              <Text className="font-PokeSolid text-3xl text-pokeWhite-500 text-center shadow-sm shadow-pokeBlue-800">
                Check
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
