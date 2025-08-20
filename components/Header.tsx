import React from "react";
import { Image, Text, View } from "react-native";
import pokeLogo from "../assets/pokemonContent/pokemonLogo.png";

interface Props {
    mainText: string;
    subText: string;
    showLogo?:boolean
}

export default function Header({mainText, subText, showLogo=false}:Props) {
  return (
    <View className="flex items-center gap-10 dark:bg-pokeBlue py-3 sm:py-1">
      {showLogo && (<Image source={pokeLogo} style={{ width: 200, height: 100 }} />)}
      <View className="sm:gap-0 flex gap-3 px-3">
        <Text className="text-pokeYellow text-5xl font-PokeSolid text-center pt-5">
          {mainText}
        </Text>
        <Text className= "dark:text-pokeWhite text-pokeBlue text-2xl font-bold font-Nunito text-center shadow-md shadow-pokeBlue">
          {subText}
        </Text>
      </View>
    </View>
  );
}
