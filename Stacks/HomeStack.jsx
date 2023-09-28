import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../Screens/HomeStack/HomeScreen"
import BookScreen from "../Screens/HomeStack/BookScreen"
import BarcodeScreen from "../Screens/HomeStack/BarcodeScreen"

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarcodeScreen"
        component={BarcodeScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})
