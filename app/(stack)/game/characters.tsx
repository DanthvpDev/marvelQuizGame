import Header from '@/components/Header';
import PokeCard from '@/components/PokeCard';
import { usePokeApiContext } from '@/Context/pokeApiContext';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function Charachters() {

  const {apiError, isLoading, pokemons} = usePokeApiContext();

  return (
    <View className='py-10 bg-pokeWhite'>
      <Header 
        mainText='Pokemons' 
        subText='Find all the info about your favorite pokemons'/>
        <ScrollView>
            {(apiError && !isLoading) && (<Text className='bg-pokeRed text-pokeWhite text-center text-xl py-5 px-3'>{apiError}</Text>)}
            {(!apiError && isLoading) && (<ActivityIndicator size={20}/>)}
            {(pokemons.length === 0) && (<Text className='text-pokeYellow text-center text-xl py-5 px-3'>This is actually empty {pokemons.length}</Text>)}
            {(pokemons.length > 0) && (
              pokemons.map((p) => (<PokeCard pokemon={p} key={p.id}/>))
            )}
        </ScrollView>
    </View>
  )
}