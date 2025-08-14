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
    <View className="flex items-center gap-10 dark:bg-pokeBlue">
      {showLogo && (<Image source={pokeLogo} style={{ width: 200, height: 100 }} />)}
      <View className="flex gap-3 px-6">
        <Text className="text-pokeYellow text-6xl font-PokeSolid text-center py-5">
          {mainText}
        </Text>
        <Text className= "dark:text-pokeWhite text-pokeBlue text-3xl font-bold font-Nunito text-center shadow-md shadow-pokeBlue">
          {subText}
        </Text>
      </View>
    </View>
  );
}
