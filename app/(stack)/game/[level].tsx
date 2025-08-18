import GameBoard from "@/components/GameBoard";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Game() {

  //? Points counter
  const [points, setPoints] = useState<number>(0);
  //? Gets the level from navigation
  const { level } = useLocalSearchParams();
  

  return (
    <View className="dark:bg-pokeBlue bg-pokeWhite h-full py-5 px-3 flex justify-center">
      <GameBoard 
        onPress={setPoints} 
        points={points}
        level={Number(level)}
        haveButtons={Number(level) === 1}/>
    </View>
  );
}
