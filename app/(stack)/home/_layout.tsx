import { Stack } from 'expo-router'
import React from 'react'

export default function HomeStacklayout() {
  return (
    <Stack
        screenOptions={{
        headerShown: false,
        title: "",
        headerTintColor: "#EAEAEA",
        headerStyle: {
          backgroundColor: "#0577FA"
        }
      }}
    >
        <Stack.Screen name='index' />
        <Stack.Screen name='login' />
    </Stack>
  )
}