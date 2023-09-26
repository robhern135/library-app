import { StyleSheet, Text, View } from "react-native"
import React from "react"
import HomeScreen from "../Screens/HomeStack/HomeScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BookScreen from "../Screens/HomeStack/BookScreen"

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
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})
