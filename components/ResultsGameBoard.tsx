import React from 'react';
import { Text, View } from 'react-native';

interface BoardProps {
    points: number, 
    level: number;
    username: string;
}

export default function ResultsGameBoard({username, level, points}:BoardProps) {
  return (
    <View className='flex flex-row justify-around items-center border-t-2 border-l-2 border-r-2 rounded-t-xl py-2 border-pokeYellow-800'>
      <View className='w-1/3'>
        <Text className='text-center text-lg font-semibold py-2 text-pokeBlue dark:text-pokeWhite-500'>Points: {points}</Text>
      </View>
      <View className='w-1/3'>
        <Text className='text-center text-lg font-semibold py-2 text-pokeBlue dark:text-pokeWhite-500'>
        {level === 1 && "Trainer"}
        {level ===2 && "Master"}
      </Text>
      </View>
      <View className='w-1/3'>
        <Text className='text-center text-lg font-semibold py-2 text-pokeBlue dark:text-pokeWhite-500 truncate'>{username}</Text>
      </View>
    </View>
  )
}