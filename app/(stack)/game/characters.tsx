import Header from '@/components/Header';
import { useMarvelApiContextProvider } from '@/Context/marvelApiContext';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Charachters() {

    const {characters, marvelApiError} = useMarvelApiContextProvider();

  return (
    <ScrollView className='py-10 bg-marvelousBlue-300'>
      <Header 
        mainText='Characters' 
        subText='Find all the info about your favorite heroes, villains, and anti-heroes'
        mainTextStyle='text-6xl text-marvelousWhite font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousRed' 
        subTextStyle='text-3xl font-BebasNeue text-marvelousWhite text-center shadow-sm shadow-marvelousRed' />
        <View>
            {
                marvelApiError 
                    ? (<Text>{marvelApiError}</Text>)
                    : (<Text>{characters.at(1)?.name}</Text>)
            }
        </View>
    </ScrollView>
  )
}