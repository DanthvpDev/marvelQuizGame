import Header from '@/components/Header';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function Charachters() {


  return (
    <ScrollView className='py-10 bg-pokeWhite'>
      <Header 
        mainText='Pokemons' 
        subText='Find all the info about your favorite pokemons'
        mainTextStyle='text-5xl text-pokeYellow pt-3 font-PokeSolid text-marvelousWhite text-center shadow-sm shadow-pokeBlue-800' 
        subTextStyle='text-3xl font-Nunito text-pokeBlue-800 text-center shadow-sm shadow-pokeBlack' />
        <View>
        </View>
    </ScrollView>
  )
}