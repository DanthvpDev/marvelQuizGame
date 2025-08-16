import React from 'react';
import { Text, View } from 'react-native';

interface BoardProps {
    points: number, 
    level: number;
    username: string;
}

export default function ResultsGameBoard({username, level, points}:BoardProps) {
  return (
    <View className='flex flex-row justify-between px-6 items-center border-b-2 border-pokeYellow-800'>
      <Text className='text-lg font-semibold py-2 text-pokeBlue dark:text-pokeWhite-500'>Points: {points}</Text>
      <Text className='text-lg font-semibold py-2 text-pokeBlue dark:text-pokeWhite-500'>
        {level === 1 && "Trainer"}
        {level ===2 && "Master"}
      </Text>
      <Text className='text-lg font-semibold py-2 text-pokeBlue dark:text-pokeWhite-500'>{username}</Text>
    </View>
  )
}