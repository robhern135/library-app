import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthStack from "./Stacks/AuthStack"
import HomeStack from "./Stacks/HomeStack"

const Stack = createNativeStackNavigator()

let initial = "AuthStack"

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial}>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
