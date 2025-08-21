import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  
  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
    >
        <Stack.Screen name='(home)/index'/>
        <Stack.Screen name='(home)/login'/>
        <Stack.Screen name='game'/>
    </Stack>
  );
}
