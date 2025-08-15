import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import PokemoLoading from "../assets/pokemonContent/pokemonLogo.png";

export default function Loader() {
  return (
    <View className="dark:bg-pokeBlue bg-pokeYellow h-full flex justify-center items-center gap-10">
        <Image source={PokemoLoading} className="w-96 h-52" />
        <ActivityIndicator size={10} color={"#EAEAEA"} />
        <Text className='text-2xl font-bold font-PokeSolid text-pokeWhite-500' >Loading...</Text>
      </View>
  )
}