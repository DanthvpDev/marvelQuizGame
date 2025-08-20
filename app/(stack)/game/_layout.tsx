import { Stack } from 'expo-router'
import React from 'react'

export default function GameLayout() {
  return (
    <Stack
    screenOptions={{
            headerShown: true,
            headerStyle:{
              backgroundColor:"#3581D8"
            },
            headerTintColor: "#EAEAEA"
    }}
    >
        <Stack.Screen name='index' options={{headerShown:false, title: "Home"}}/>
        <Stack.Screen name='gameConfig' options={{title:"Game Configuration"}}/>
        <Stack.Screen name='characters' options={{title:""}}/>
        <Stack.Screen name='[level]' options={{headerShown:false}}/>
    </Stack>
  )
}