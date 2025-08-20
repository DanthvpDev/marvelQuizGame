import { useAuthContext } from "@/Context/AuthContext";
import useGame from "@/hooks/useGame";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import CharizardError from "../assets/pokemonContent/charizardError.png";
import ResultsGameBoard from "./ResultsGameBoard";

interface BoardProps {
  haveButtons?: boolean;
  onPress: React.Dispatch<React.SetStateAction<number>>;
  points: number;
  level: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Highlights {
  points: number;
}

export default function GameBoard({
  haveButtons,
  onPress,
  points,
  level,
  setShowModal
}: BoardProps) {
  const [userOption, setUserOption] = useState<string>();

  //? Hook that gets pokemons
  const { pokemonsForGame, startGame, answer, isAnswerCorrect, pokemonsError } =
    useGame();
  //? Gets the user
  const { user } = useAuthContext();

  const handleRestart = () => {
    startGame();
    onPress(0);
  };

  function handleAnswer(userAnswer?: string) {
    if (haveButtons) setUserOption(userAnswer);
    //* Error handlign for input
    //* Verifies if the correct answer and the option selected are the same
    if (answer && userOption && isAnswerCorrect(answer, userOption)) {
      onPress((p) => (p += 1));
    } 
    else {
      const gameHighlights = {
        points,
      } as Highlights;
      
      setShowModal(true);
      onPress(0);
    }
    startGame();
  }

  if (pokemonsError)
    return (
      <View>
        <View className="h-64">
          <Image
            source={CharizardError}
            className="h-full aspect-square rounded-xl self-center shadow-xl shadow-pokeRed"
          />
        </View>
        <Pressable
          onPress={() => router.push("/(stack)/game/[results]")}
          className=" mt-5 self-center z-10 bg-pokeBlue dark:bg-pokeWhite-500 pt-2 pb-1 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-36"
        >
          <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
            Home
          </Text>
        </Pressable>
      </View>
    );

  return (
    <>
      <View className="mb-5 flex flex-row justify-between">
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
                  onPress={() => handleAnswer(p.name)}
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
              onChangeText={(text) => setUserOption(text)}
              placeholder="Enter pokemon name"
              returnKeyLabel="done"
              returnKeyType="done"
              className="placeholder:text-pokeWhite/70 w-full pt-1 pb-2 bg-pokeBlue/65 dark:bg-pokeYellow-700/65 rounded-lg text-xl pl-2 text-pokeWhite border-2 border-pokeYellow"
            />
            <Pressable
              onPress={() => {
                handleAnswer(userOption);
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
    </>
  );
}
