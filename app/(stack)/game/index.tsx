import Header from "@/components/Header";
import { useAuthContext } from "@/Context/AuthContext";
import Fontawesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function GameHome() {
const {logout} = useAuthContext();

  return (
    <View className="dark:bg-pokeBlue bg-pokeWhite h-full flex px-6 gap-12 sm:gap-0 sm:pt-0 pt-24">
      <View className="flex gap-3 sm:gap-0 ">
        <View className= "sm:mb-0 mb-24 items-end">
          <Pressable
          onPress={()=> {
            logout();
            router.replace("/login");
          }}
          className="z-10 bg-pokeRed-300 py-2 rounded-xl active:bg-pokeBlue-800/50 border-4 border-pokeBlue-800 dark:border-pokeWhite w-32"
        >
          <Text className="rotate-180 font-PokeSolid text-pokeWhite-500 text-center shadow-sm shadow-pokeBlue-800">
            <Fontawesome name="arrow-right-from-bracket" size={25} />
          </Text>
        </Pressable>
        </View>
        <Header showLogo={true} mainText="PokeTrivia" subText="Challenge your knowledge"  />
        <View className="flex flex-row justify-around items-center gap-5 mt-14 sm:gap-4 sm:mt-12">
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
