 
import { useAuthContext } from "@/Context/AuthContext";
import { IUserLoginInfo, UserAuth } from "@/types/User.type";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginForm() {

    const {login, error} = useAuthContext();

  const {
    reset,
    formState: { errors },
    control,
    handleSubmit
  } = useForm<IUserLoginInfo>();

  const onSubmit = async(data:UserAuth)=> {
      const res = await login(data.email, data.password);
      if(res) {
        router.replace("/game");
        reset();
      };
  }

  return (
    <View className="flex flex-col justify-center items-center gap-3 sm:gap-1">
      <Text className="sm:text-4xl text-3xl text-center text-marvelousWhite font-BebasNeue text-pokeBlue-300 dark:text-pokeYellow">
        Login
      </Text>
      {error && (<Text className="text-lg bg-pokeRed-300 px-2 text-center text-pokeWhite rounded-xl w-10/12 font-Nunito">{error}</Text>)}
      <View className="w-9/12 gap-3">
        <View>
          <Text className="text-pokeBlue-800 dark:text-pokeWhite font-BebasNeue text-2xl">Email</Text>
          <Controller
            control={control}
            rules={{ required: "The Email is required" }}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                onChangeText={onChange} 
                value={value} 
                returnKeyLabel="done"
                returnKeyType="done"
                className="pt-1 pb-2 bg-pokeBlue/65 dark:bg-pokeYellow-700/65 rounded-lg text-xl pl-2 text-pokeWhite" 
                keyboardType="email-address"
                />
            )}
          />
          {errors.email && (<Text className="text-lg bg-pokeRed-300 px-2 text-center text-pokeWhite rounded-lg w-10/12 self-center mt-2">{errors.email?.message}</Text>)}
        </View>
        <View>
          <Text className="text-pokeBlue-800 dark:text-pokeWhite font-BebasNeue text-2xl">Password</Text>
          <Controller
            control={control}
            rules={{ required: "The password is required" }}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                onChangeText={onChange} 
                value={value} 
                returnKeyLabel="done"
                returnKeyType="done"
                secureTextEntry={true}
                className="pt-1 pb-2 bg-pokeBlue/65 dark:bg-pokeYellow-700/65 rounded-lg text-xl pl-2 text-pokeWhite" 
                />
            )}
          />
          {errors.password && (<Text className="text-lg bg-pokeRed-300 px-2 text-center text-pokeWhite rounded-lg w-10/12 self-center mt-2">{errors.password?.message}</Text>)}
        </View>
      </View>
      <View className="mt-5">
            <Pressable 
            onPress={handleSubmit((data)=> {
                onSubmit(data);
            })} 
            className="z-10 bg-pokeBlue dark:bg-pokeYellow-800 py-3 px-6 rounded-xl active:bg-pokeYellow-800/70 active:border-pokeYellow border-2 border-pokeWhite">
                <Text className="font-PokeSolid text-3xl text-pokeWhite w-full">Login</Text>
            </Pressable>
      </View>
    </View>
  );
}
