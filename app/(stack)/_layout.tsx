import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "",
        headerTintColor: "#EAEAEA",
        headerStyle: {
          backgroundColor: "#0577FA"
        }
      }}
    >

      <Stack.Screen name="index" />
      <Stack.Screen name="/login"/>
      <Stack.Screen name="/homepage"/>
    </Stack>
  );
}
