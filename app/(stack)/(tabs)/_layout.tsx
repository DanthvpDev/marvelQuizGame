import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from "react-native";

export default function Tabslayout() {

  
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#00568C",
            tabBarInactiveBackgroundColor: "#EAEAEA"
        }}
    >
        <Tabs.Screen 
          name='home/homePage' 
          options={{title: "Home", tabBarLabelStyle:tabLabelStyle.tabLabel,  tabBarIcon: ({color})=> <FontAwesome name="house" size={25} color={color}/>}}/>

        <Tabs.Screen 
          name='game/index' 
          options={{title: "Game", tabBarLabelStyle:tabLabelStyle.tabLabel,  tabBarIcon: ({color})=> <FontAwesome name="gamepad" size={25} color={color}/>}}/>

    </Tabs>
  )
}

const tabLabelStyle = StyleSheet.create({
  tabLabel: {
    fontSize:18, 
    fontWeight:"bold",
  }
})