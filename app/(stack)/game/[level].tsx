import GameBoard from "@/components/GameBoard";
import ResultsModal from "@/components/ResultsModal";
import { useAuthContext } from "@/Context/AuthContext";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Game() {
  //? Gets the level from navigation
  const { level } = useLocalSearchParams();
  const {user} = useAuthContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  //? Points counter
  const [points, setPoints] = useState<number>(0);
  

  return (
    <View className="dark:bg-pokeBlue bg-pokeWhite h-full py-5 px-3 flex justify-center">
      <GameBoard 
        onPress={setPoints} 
        points={points}
        level={Number(level)}
        haveButtons={Number(level) === 1}
        setShowModal={setShowModal}
        />
        {
          showModal && <ResultsModal setShowModal={setShowModal} points={points} user={user?.username} />
        }
    </View>
  );
}
