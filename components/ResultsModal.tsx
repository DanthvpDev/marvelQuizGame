import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import pokemonLogo from "../assets/pokemonContent/pokemonLogo.png";

interface ResultsModalProps {
  points: number;
  user?: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResultsModal({
  points,
  user,
  setShowModal,
}: ResultsModalProps) {
  return (
    <View className="sm:pt-0 z-20 h-full rounded-3xl px-3 pt-10 absolute w-full bg-pokeBlack/95 self-center shadow-lg shadow-pokeYellow items-center">
      <Image
        className="sm:mt-5 mt-14"
        style={{ width: 250, height: 100 }}
        source={pokemonLogo}
      />
      <View className="sm:flex sm:flex-row sm:w-9/12 sm:mt-6 sm:justify-between">
        <View className="sm:py-2 sm:mt-0 py-11 gap-5 px-10 rounded-xl mt-10 border-2 border-pokeWhite-500">
          <Text className="text-pokeYellow pt-1 text-4xl mb-5 text-center font-PokeSolid">
            Results
          </Text>
          <Text className="text-pokeWhite-500 text-2xl font-bold ">
            User: {user}
          </Text>
          <Text className="text-pokeWhite-500 text-2xl font-bold">
            Points: {points}
          </Text>
        </View>
        <View className="sm:mt-0 sm:flex-col sm:justify-around sm:w-1/3 mt-10 flex flex-row justify-between w-11/12">
          <Pressable
            onPress={() => router.push("/game/")}
            className="z-10 bg-pokeBlue dark:bg-pokeWhite-500 px-2 py-4 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-40 sm:w-44"
          >
            <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowModal(false);
            }}
            className="z-10 bg-pokeBlue dark:bg-pokeWhite-500 px-2 py-4 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-44"
          >
            <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
              Play Again
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
