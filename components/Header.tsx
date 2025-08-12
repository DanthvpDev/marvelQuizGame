import React from "react";
import { Image, Text, View } from "react-native";
import marvelLogo from "../assets/marvelContent/Marvel_Logo.png";

interface Props {
    mainText: string;
    subText: string;
    mainTextStyle?: string;
    subTextStyle?: string;
}

export default function Header({mainText, subText, mainTextStyle, subTextStyle}:Props) {
  return (
    <View className="flex items-center gap-10">
      <Image source={marvelLogo} style={{ width: 280, height: 115 }} />
      <View className="flex gap-3 px-6">
        <Text className={mainTextStyle ? 
              mainTextStyle
              :  "text-6xl font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousWhite"
        }>
          {mainText}
        </Text>
        <Text className={subTextStyle ?
          subTextStyle
          : "text-4xl font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousWhite"}>
          {subText}
        </Text>
      </View>
    </View>
  );
}
