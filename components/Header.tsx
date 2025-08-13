import React from "react";
import { Image, Text, View } from "react-native";
import pokeLogo from "../assets/pokemonContent/pokemonLogo.png";

interface Props {
    mainText: string;
    subText: string;
    mainTextStyle?: string;
    subTextStyle?: string;
}

export default function Header({mainText, subText, mainTextStyle, subTextStyle}:Props) {
  return (
    <View className="flex items-center gap-10">
      <Image source={pokeLogo} style={{ width: 280, height: 115 }} />
      <View className="flex gap-3 px-6">
        <Text className={mainTextStyle ? 
              mainTextStyle
              :  "dark:text-pokeYellow text-pokeYellow text-6xl font-Nunito text-marvelousWhite text-center shadow-sm shadow-pokeBlue py-5"
        }>
          {mainText}
        </Text>
        <Text className={subTextStyle ?
          subTextStyle
          : "dark:text-pokeWhite text-pokeBlue text-3xl font-bold font-Nunito text-marvelousWhite text-center shadow-sm shadow-marvelousWhite"}>
          {subText}
        </Text>
      </View>
    </View>
  );
}
