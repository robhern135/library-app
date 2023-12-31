import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ShelvesScreen from "../Screens/BooksStack/ShelvesScreen"
import ProgressScreen from "../Screens/BooksStack/ProgressScreen"
import UpdateProgressScreen from "../Screens/BooksStack/UpdateProgressScreen"

const Stack = createNativeStackNavigator()

const BooksStack = () => {
  return (
    <Stack.Navigator initialRouteName="ShelvesScreen">
      <Stack.Screen
        name="ShelvesScreen"
        component={ShelvesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProgressScreen"
        component={ProgressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="UpdateProgressScreen"
          component={UpdateProgressScreen}
          options={{}}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default BooksStack

const styles = StyleSheet.create({})
