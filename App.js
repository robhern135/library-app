import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

//navigation
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

//screen
import AuthStack from "./Stacks/AuthStack"
import HomeStack from "./Stacks/HomeStack"
import BooksStack from "./Stacks/BooksStack"
import SettingsStack from "./Stacks/SettingsStack"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

let initial = "AuthStack"

import Ionicons from "react-native-vector-icons/Ionicons"
import Colors from "./Constants/Colors"

export const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="BooksStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "HomeStack") {
            iconName = focused ? "ios-home" : "ios-home-outline"
          } else if (route.name === "BooksStack") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "SettingsStack") {
            iconName = focused ? "settings" : "settings-outline"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black,
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false, title: "Home" }}
      />
      <Tab.Screen
        name="BooksStack"
        component={BooksStack}
        options={{ headerShown: false, title: "My Books" }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{ headerShown: false, title: "Settings" }}
      />
    </Tab.Navigator>
  )
}

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
          name="TabStack"
          component={TabStack}
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
