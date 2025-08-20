 
import { Pokemon } from "@/interfaces/pokeApi.interface";
import React from "react";
import { Image, Text, View } from "react-native";
// import pokeball from "../assets/pokemonContent/pokeball-background.png";

interface PokeCardProps {
  pokemon: Pokemon;
}

export default function PokeCard({ pokemon }: PokeCardProps) {
  return (
    <View className="sm:w-8/12 rounded-xl w-10/12 relative border-2 border-pokeBlue-800 self-center mb-5 overflow-hidden shadow-xl shadow-pokeBlue">
      {/* <Image className="absolute w-full h-full" source={pokeball} /> */}
      <View className="sm:flex-row flex flex-col bg-pokeRed-300">
        <View className="items-center h-56 w-full self-center sm:w-3/6">
          <Image className="h-full w-44" src={pokemon.image.front_shiny} />
        </View>
        <View className="bg-pokeWhite px-2 rounded-t-lg pt-2 sm:justify-around sm:flex-1">
          <Text className="text-pokeBlue-800 font-extrabold text-3xl font-boldborder-t-blue-800 pt-3 capitalize py-3">
            {pokemon.name}
          </Text>
          <Text className="text-pokeBlue-800 font-bold text-2xl border-t border-t-blue-800 pt-3 uppercase py-3">
            Abilities
          </Text>

          <View className="flex flex-row justify-around flex-wrap mb-3 gap-3">
            {
              pokemon.abilities.map(a => (<Text key={a.ability?.url} className="text-pokeWhite text-lg bg-pokeYellow-800/90 w-max px-3 py-2 rounded-lg capitalize">
              {a.ability?.name}
            </Text>))
            }
          </View>
        </View>
      </View>
    </View>
  );
}
