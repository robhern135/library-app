import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SettingsScreen from "../Screens/SettingsStack/SettingsScreen"

const Stack = createNativeStackNavigator()

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default SettingsStack

const styles = StyleSheet.create({})
