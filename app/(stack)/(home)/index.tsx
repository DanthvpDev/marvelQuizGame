/* eslint-disable react-hooks/rules-of-hooks */
import Header from "@/components/Header";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

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
      <Header mainText="Marvel Codex Trivia" subText="Welcome back hero" />
      <View>
        <Pressable 
          onPress={()=> router.push("/login")}
          className="z-10 bg-marvelousBlue py-3 px-6 rounded-xl active:bg-marvelousBlue-800/50 border-2 border-marvelousWhite">
          <Text className="font-BebasNeue text-3xl text-marvelousWhite w-full">Login</Text>
          </Pressable> 
      </View>
    </View>
  );
}
