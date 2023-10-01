import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ShelvesScreen from "../Screens/BooksStack/ShelvesScreen"

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShelvesScreen"
        component={ShelvesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})
