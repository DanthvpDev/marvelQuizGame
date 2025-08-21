import Header from "@/components/Header";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface LevelConfiguration {
  level: number;
}

export default function GameConfig() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LevelConfiguration>({ defaultValues: {} as LevelConfiguration });

  const onSubmit = (data: LevelConfiguration) => {
    router.push({
      pathname: "/(stack)/game/[level]",
      params: { level: data.level },
    });
  };

  return (
    <View className="dark:bg-pokeBlue bg-pokeWhite h-full py-10 sm:py-4">
      <Header mainText="Configuration" subText="" />
      <View className="flex sm:flex-row sm:justify-around sm:items-center sm:mt-0 border-2 border-pokeWhite rounded-xl w-11/12 self-center mt-5 py-4 px-3">
        <View className="py-5 sm:py-0 sm:w-4/6">
          <Text className="text-2xl dark:text-pokeWhite-500 text-pokeBlue font-bold">
            Select your level
          </Text>
          <Controller
            control={control}
            defaultValue={1}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Picker
                onValueChange={onChange}
                selectedValue={value}
                style={styles.PickerStyle}
                itemStyle={styles.PickerItemStyle}
              >
                <Picker.Item value={1} label="Trainer" />
                <Picker.Item value={2} label="Master" />
              </Picker>
            )}
            name="level"
          />
          {errors.root?.message && (
            <Text className="self-center text-lg bg-pokeRed-300 px-2 text-center text-pokeWhite rounded-xl w-10/12 font-Nunito">
              {errors.root?.message}
            </Text>
          )}
        </View>
        <View className="flex justify-center items-center mt-8 sm:mt-0">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="z-10 bg-pokeBlue dark:bg-pokeYellow-700 pt-3 pb-2 rounded-xl active:bg-pokeBlue-800/50 border-4 border-pokeBlue-800 dark:border-pokeWhite w-44"
          >
            <Text className="font-PokeSolid text-3xl text-pokeWhite-500 text-center shadow-sm shadow-pokeBlue-800">
              Start
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PickerStyle: {
    backgroundColor: "#E5BA13",
    height: 63,
    padding: 0,
    borderWidth: 2,
    borderColor: "#EED",
    borderRadius: 15,
    marginTop: 10,
  },
  PickerItemStyle: {
    height: 60,
    padding: 0,
    color: "#3581D8",
    fontSize: 18,
  },
});
