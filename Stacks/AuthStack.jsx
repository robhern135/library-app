import { StyleSheet, Text, View } from "react-native"
import React from "react"
import RegisterScreen from "../Screens/AuthStack/RegisterScreen"
import LoginScreen from "../Screens/AuthStack/LoginScreen"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})
