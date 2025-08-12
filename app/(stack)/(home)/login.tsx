import LoginForm from '@/components/LoginForm'
import React from 'react'
import { View } from 'react-native'

export default function login() {
  return (
    <View className='h-full bg-marvelousBlue pt-32'>
      <LoginForm />
    </View>
  )
}