import ResultsGameBoard from '@/components/ResultsGameBoard';
import { useAuthContext } from '@/Context/AuthContext';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function Game() {
    //? Gets the user
    const {user} = useAuthContext();
    //? Points counter
    const [points, setPoints] = useState<number>(0);
    //? Gets the level from navigation
    const {level} =  useLocalSearchParams();
  return (
    <View className='dark:bg-pokeBlue bg-pokeWhite h-full py-5'>
      <ResultsGameBoard username={user?.username ? user.username : "player"} points={points} level={Number(level)}></ResultsGameBoard>
    </View>
  )
}