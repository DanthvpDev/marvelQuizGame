import LoginForm from '@/components/LoginForm'
import React from 'react'
import { View } from 'react-native'

export default function login() {
  return (
    <View className='h-full bg-pokeWhite dark:bg-pokeBlue pt-32 sm:pt-16'>
      <LoginForm />
    </View>
  )
}