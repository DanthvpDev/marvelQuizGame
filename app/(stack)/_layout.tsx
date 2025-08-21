import { useAuthContext } from "@/Context/AuthContext";
import { router, Stack } from "expo-router";
import React from "react";

export default function StackLayout() {

  const {user} = useAuthContext();

  if(!user){
    router.replace("/login")
  }
  
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
