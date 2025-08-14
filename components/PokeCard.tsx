import { Pokemon } from "@/interfaces/pokeApi.interface";
import React from "react";
import { Image, Text, View } from "react-native";
import pokeball from "../assets/pokemonContent/pokeball-background.png";

interface PokeCardProps {
  pokemon: Pokemon;
}

export default function PokeCard({ pokemon }: PokeCardProps) {

  return (
    <View className="rounded-xl gap-3 flex flex-col w-9/12 relative border">
      <Image className="absolute w-full h-full" source={pokeball} />
      <View className="items-center">
        <Image className="h-48 w-48" src={pokemon.image.front_shiny} />
      </View>
      <Text className="dark:text-pokeWhite text-3xl font-bold border-t border-t-blue-800 pt-3">
        {pokemon.name}
      </Text>
      <Text className="text-pokeWhite text-2xl border-t border-t-blue-800 pt-3">
        Abilities
      </Text>

      <View className="flex flex-row justify-evenly pt-1 pb-3">
        <Text className="text-pokeWhite text-xl bg-pokeYellow-800/90 px-3 py-2 rounded-lg">
          Esquivar
        </Text>
        <Text className="text-pokeWhite text-xl bg-pokeYellow-800/90 px-3 py-2 rounded-lg">
          Esquivar
        </Text>
        <Text className="text-pokeWhite text-xl bg-pokeYellow-800/90 px-3 py-2 rounded-lg">
          Esquivar
        </Text>
      </View>
    </View>
  );
}
