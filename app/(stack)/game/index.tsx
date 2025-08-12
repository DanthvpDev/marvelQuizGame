import Header from "@/components/Header";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function GameHome() {


  return (
    <View className="bg-marvelousRed h-full flex justify-center items-center gap-10">
      <View className="flex gap-3 px-6">
        <Header  mainText="Marvel Codex Trivia" subText="Challenge your powers" />
        <View className="flex flex-row justify-around items-center mt-14">
          <Pressable
          onPress={()=> router.push("/game/characters")}
          className="w-36 z-10 bg-marvelousBlue-300 py-4 rounded-xl active:bg-marvelousBlue-800/50 border-2 border-marvelousWhite"
        >
          <Text className="text-center font-BebasNeue text-3xl text-marvelousWhite w-full">
            Characters
          </Text>
        </Pressable>
          <Pressable
          onPress={()=> router.push("/game/gameConfig")}
          className="w-36 z-10 bg-marvelousBlue-300 py-4 rounded-xl active:bg-marvelousBlue-800/50 border-2 border-marvelousWhite"
        >
          <Text className="text-center font-BebasNeue text-3xl text-marvelousWhite w-full">
            Play
          </Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
}
