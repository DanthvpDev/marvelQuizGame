/* eslint-disable react-hooks/rules-of-hooks */
import NavigationButton from "@/components/Button";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import marvelLogo from "../../assets/marvelContent/Marvel_Logo.png";

export default function index() {

  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      headerShown:false
    })
  }, [setOptions])
  

  return (
    <View className="bg-marvelousRed h-full flex justify-center items-center gap-16">
      <Image source={marvelLogo} style={{ width: 280, height: 115 }} />
      <View className="flex gap-3 px-6">
        <Text className="text-6xl font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousWhite">
          Marvel Codex Trivia
        </Text>
        <Text className="text-4xl font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousWhite">
          Challenge your Marvel comics knowledge
        </Text>
      </View>
      <View className="flex flex-row gap-5">
        <NavigationButton buttonStyles="bg-marvelousBlue border-2 border-marvelousWhite px-8 py-6 rounded-full shadow-md shadow-marvelousBlack/80" text="Characters" textStyles="text-3xl font-BebasNeue text-white" />
        <NavigationButton buttonStyles="bg-marvelousBlue border-2 border-marvelousWhite px-8 py-6 rounded-full shadow-md shadow-marvelousBlack/80" text="Play Game" textStyles="text-3xl font-BebasNeue text-white" />
      </View>
    </View>
  );
}
