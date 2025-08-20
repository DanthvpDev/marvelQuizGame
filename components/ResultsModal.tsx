import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import pokemonLogo from "../assets/pokemonContent/pokemonLogo.png";

interface ResultsModalProps {
    points:number;
    user?:string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResultsModal({points, user, setShowModal}:ResultsModalProps) {
  return (
    <View className='z-20 h-full rounded-3xl px-3 pt-10 absolute w-full bg-pokeBlack/95 self-center shadow-lg shadow-pokeYellow items-center'>
     <Image className='mt-14' style={{ width: 250, height: 100 }} source={pokemonLogo}/>
      <View className='py-12 gap-5 px-8 rounded-xl mt-10 border-2 border-pokeWhite-500 w-5/6'>
      <Text className='text-pokeYellow text-5xl mb-5 text-center font-PokeSolid'>Results</Text>
        <Text className='text-pokeWhite-500 text-2xl font-bold '>User: {user}</Text>
        <Text className='text-pokeWhite-500 text-2xl font-bold'>Points: {points}</Text>
      </View>
      <View className="mt-10 flex flex-row justify-between w-11/12">
              <Pressable
                onPress={() => router.push("/game/")}
                className="z-10 bg-pokeBlue dark:bg-pokeWhite-500 px-2 py-4 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-44"
              >
                <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
                  Home
                </Text>
              </Pressable>
              <Pressable
                onPress={()=> {
                  setShowModal(false);
                }}
                className="z-10 bg-pokeBlue dark:bg-pokeWhite-500 px-2 py-4 rounded-xl active:bg-pokeWhite-500/80 border-4 border-pokeYellow w-44"
              >
                <Text className="font-PokeSolid text-3xl text-pokeWhite-500 dark:text-pokeBlue text-center shadow-sm shadow-pokeYellow">
                  Play Again
                </Text>
              </Pressable>
            </View>
    </View>
  )
}