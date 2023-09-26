//** React & RN
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native"
import { useState, useEffect, useLayoutEffect } from "react"

import Colors from "../../Constants/Colors"
//** Icons
import { MaterialIcons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"

//** Constants
import { styles } from "../../Constants/Styles/Auth/Styles"

//** Firebase */
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { SafeAreaView } from "react-native-safe-area-context"
const auth = getAuth()

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hidePassword, setHidePassword] = useState(true)
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    console.log("usefeefct")
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user)
          navigation.navigate("HomeStack")
          setIsLoading(false)
        } else {
          // User is signed out
          setUser(undefined)
          setIsLoading(false)
        }
      }
    )
    return unsubscribeFromAuthStatusChanged
  }, [])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        const user = userCredential.user
        console.log(`Logged in with ${user.email}`)
      })
      .catch((err) => alert(err.message))
  }
  const handleRegisterScreen = () => {
    navigation.navigate("RegisterScreen", {
      email: email,
      password: password,
    })
  }

  return (
    <>
      {isLoading ? (
        <SafeAreaView
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={"blue"} />
        </SafeAreaView>
      ) : (
        // <ImageBackground
        //   source={require("../assets/background.jpg")}
        //   resizeMode="cover"
        //   style={{ height: "100%" }}
        // >
        <View style={{ height: "100%" }}>
          <SafeAreaView
            style={[styles.container, { backgroundColor: "transparent" }]}
            behavior={"padding"}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.header}>Login to get started</Text>
              {/* <Text style={styles.subheading}>
              Sign in and start logging your triggers today.
            </Text> */}
              <View style={styles.emailContainer}>
                <MaterialIcons
                  name="alternate-email"
                  size={24}
                  color="black"
                  style={styles.emailIcon}
                />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                ></TextInput>
              </View>
              <View style={styles.passwordContainer}>
                <Feather
                  name="lock"
                  size={24}
                  color="black"
                  style={styles.passwordIcon}
                />
                <TextInput
                  secureTextEntry={hidePassword ? true : false}
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={[styles.input, { width: "100%" }]}
                ></TextInput>
                <Feather
                  onPress={() => {
                    setHidePassword(!hidePassword)
                  }}
                  style={styles.eyeIcon}
                  name={hidePassword ? "eye-off" : "eye"}
                  size={24}
                  color={hidePassword ? Colors.black : Colors.primary}
                />
              </View>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
              <TouchableOpacity
                onPress={handleRegisterScreen}
                style={styles.signUp}
              >
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <Text style={[styles.signUpText]}>Sign up.</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          {/* </ImageBackground> */}
        </View>
      )}
    </>
  )
}

export default LoginScreen
