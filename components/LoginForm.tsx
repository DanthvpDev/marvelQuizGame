 
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
    <View className="flex flex-col justify-center items-center gap-3">
      <Text className="text-3xl text-center text-marvelousWhite font-BebasNeue">
        Login
      </Text>
      {error && (<Text className="text-lg bg-marvelousRed-300 px-2 text-center text-marvelousWhite rounded-xl w-10/12">{error}</Text>)}
      <View className="w-9/12 gap-3">
        <View>
          <Text className="text-marvelousWhite font-BebasNeue text-2xl">Email</Text>
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
                className="pt-1 pb-2 bg-marvelousWhite/65 rounded-lg text-xl pl-2 text-marvelousBlue-800" 
                keyboardType="email-address"
                />
            )}
          />
          {errors.password && (<Text className="text-lg bg-marvelousRed-300 px-2 text-center text-marvelousWhite rounded-lg w-10/12 self-center mt-2">{errors.email?.message}</Text>)}
        </View>
        <View>
          <Text className="text-marvelousWhite font-BebasNeue text-2xl">Password</Text>
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
                className="pt-1 pb-2 bg-marvelousWhite/65 rounded-lg text-xl pl-2 text-marvelousBlue-800" 
                />
            )}
          />
          {errors.password && (<Text className="text-lg bg-marvelousRed-300 px-2 text-center text-marvelousWhite rounded-lg w-10/12 self-center mt-2">{errors.password?.message}</Text>)}
        </View>
      </View>
      <View className="mt-5">
            <Pressable 
            onPress={handleSubmit((data)=> {
                onSubmit(data);
            })} 
            className="z-10 bg-marvelousRed-300 py-3 px-5 rounded-xl active:bg-marvelousBlue-800/50 border-2 border-marvelousWhite">
                <Text className="font-BebasNeue text-2xl text-marvelousWhite w-full">Login</Text>
            </Pressable>
      </View>
    </View>
  );
}
