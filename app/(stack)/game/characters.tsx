import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PokeCard from "@/components/PokeCard";
import useApiRequest from "@/hooks/useApiRequest";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

export default function Charachters() {
  const [page, setPage] = useState(1);
  const { pokemonsError, pokemonsGotten, pokemons, isLoadingPokemons } =
    useApiRequest(page);


  
  const handlePress = (prev:number, next:boolean) => {
    return next ?  prev+=1 : prev-=1; 
  }


  return (
    <View className="light:bg-pokeWhite h-full bg-pokeWhite">
      {
        (isLoadingPokemons && !pokemonsGotten) && (
          <Loader />
        )
      }

      <ScrollView className="h-96 py-0 flex flex-col">
        <Header
          mainText="Pokemons"
          subText="Find all the info about your favorite pokemons"
        />
        {pokemons && pokemons.map((p) => <PokeCard pokemon={p} key={p.id} />)}
      </ScrollView>

      <View className=" py-2 h-16 relative bg-pokeBlue-300">
        <View className="absolute flex flex-row items-center justify-center w-full gap-5">
          <Pressable
            className="bg-pokeBlue-800 px-6 py-2 top-2 rounded-lg"
            onPress={() => setPage((prev)=> {
              if(prev > 1) return handlePress(prev, false);
              return prev;
            })}
          >
            <Text className="text-pokeWhite text-2xl">-</Text>
          </Pressable>
          <View className="top-2">
            <Text className="bg-pokeBlue-800 text-2xl py-2 px-6 text-pokeWhite rounded-lg">{page}</Text>
          </View>
          <Pressable
            className="bg-pokeBlue-800 px-6 py-2 top-2 rounded-lg"
            onPress={() => setPage((prev)=>  handlePress(prev, true))}
          >
            <Text className="text-pokeWhite text-2xl">+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
