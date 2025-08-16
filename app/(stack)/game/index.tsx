import Header from "@/components/Header";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function GameHome() {


  return (
    <View className="dark:bg-pokeBlue bg-pokeWhite h-full flex justify-center items-center gap-10">
      <View className="flex gap-3 px-6">
        <Header showLogo={true} mainText="PokeTrivia" subText="Challenge your knowledge"  />
        <View className="flex flex-row justify-around items-center gap-5 mt-14">
          <Pressable
          onPress={()=> router.push("/game/characters")}
          className="z-10 bg-pokeBlue dark:bg-pokeYellow-700 py-4 rounded-xl active:bg-pokeBlue-800/50 border-4 border-pokeBlue-800 dark:border-pokeWhite w-44"
        >
          <Text className="font-PokeSolid text-3xl text-pokeWhite-500 text-center shadow-sm shadow-pokeBlue-800">
            Pokemons
          </Text>
        </Pressable>
          <Pressable
          onPress={()=> router.push("/game/gameConfig")}
          className="z-10 bg-pokeBlue dark:bg-pokeYellow-700 py-4 rounded-xl active:bg-pokeBlue-800/50 border-4 border-pokeBlue-800 dark:border-pokeWhite w-44"
        >
          <Text className="font-PokeSolid text-3xl text-pokeWhite-500 text-center shadow-sm shadow-pokeBlue-800">
            Play
          </Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
}
