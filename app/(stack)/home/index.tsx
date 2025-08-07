/* eslint-disable react-hooks/rules-of-hooks */
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import marvelLogo from "../../../assets/marvelContent/Marvel_Logo.png";

export default function index() {

    //? Navigation
  const { setOptions } = useNavigation();
  useEffect(() => {
    setOptions({
      headerShown: false,
    });
  }, [setOptions]);

  return (
    <View className="bg-marvelousRed h-full flex justify-center items-center gap-10">
      <Image source={marvelLogo} style={{ width: 280, height: 115 }} />
      <View className="flex gap-3 px-6">
        <Text className="text-6xl font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousWhite">
          Marvel Codex Trivia
        </Text>
        <Text className="text-4xl font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousWhite">
          Welcome back hero
        </Text>
      </View>
      <View>
        <Pressable 
          onPress={()=> router.push("/home/login")}
          className="z-10 bg-marvelousBlue py-3 px-6 rounded-xl active:bg-marvelousBlue-800/50 border-2 border-marvelousWhite">
          <Text className="font-BebasNeue text-3xl text-marvelousWhite w-full">Login</Text>
          </Pressable> 
      </View>
    </View>
  );
}
