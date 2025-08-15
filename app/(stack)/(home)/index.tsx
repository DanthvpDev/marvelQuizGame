/* eslint-disable react-hooks/rules-of-hooks */
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import useApiRequest from "@/hooks/useApiRequest";
import { useQuery } from "@tanstack/react-query";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function index() {

  const {gettingAllResults} = useApiRequest(); 
  
  const {error:apiDataError, status:apiDataStatus, isFetched} = useQuery({
    queryKey: ["apiData"],
    queryFn: gettingAllResults
  })

    //? Navigation
  const { setOptions } = useNavigation();
  useEffect(() => {
    setOptions({
      headerShown: false,
    });
  }, [setOptions]);

  if(apiDataStatus === "pending") {
    return (
      <Loader />
    )
  }

  return (
    <View className="dark:bg-pokeBlue bg-pokeWhite h-full flex justify-center items-center gap-10">
      <Header mainText="PokeTrivia" subText="Welcome back poke-friend" />
      <View>
        <Pressable 
          onPress={()=> router.push("/login")}
          className="z-10 bg-pokeBlue dark:bg-pokeYellow-800 py-3 px-6 rounded-xl active:bg-pokeBlue-800/50 border-2 border-pokeWhite">
          <Text className="font-PokeSolid text-3xl text-pokeWhite w-full">Login</Text>
          </Pressable> 
      </View>
    </View>
  );
}
