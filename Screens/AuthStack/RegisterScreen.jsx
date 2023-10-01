import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import React, { useState, useEffect, useLayoutEffect } from "react"

//** Constants
import Colors from "../../Constants/Colors"

import { styles } from "../../Constants/Styles/Auth/Styles"

//** Icons
import { MaterialIcons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

//**FIREBASE
import { app, db } from "../../Firebase/firebase"
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { addDoc, collection, setDoc, doc } from "firebase/firestore"

const auth = getAuth()

const RegisterScreen = ({ route, navigation }) => {
  const [name, setName] = useState("")
  // const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirm, setPasswordConfirm] = useState()
  const [hidePassword, setHidePassword] = useState(true)
  const [userId, setUserId] = useState("")
  const [registerDisabled, setRegisterDisabled] = useState(true)
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const handleSignUp = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential._tokenResponse
          setUserId(userCredential.user.uid)
          console.log(`userUid: ${userId}`)
          const userCreated = Date().toLocaleString()
          try {
            const docRef = await setDoc(
              doc(db, "users", userCredential.user.uid),
              {
                name,
                // lastName,
                email,
                userCreated,
                id: userCredential.user.uid,
              }
            )
            console.log(`UID: ${userCredential.user.uid}`)
          } catch (e) {
            console.error("Error adding document: ", e)
          }
        })
        .catch((err) => {
          alert(err.message)
          console.log(err.message)
        })
    } catch (err) {
      console.log(`ERROR: ${err}`)
    }
  }

  const handleRegisterScreen = () => {
    navigation.replace("LoginScreen")
  }

  useEffect(() => {
    console.log(`password : ${password}`)
    console.log(`passwordConfirm : ${passwordConfirm}`)

    if (password !== undefined) {
      if (passwordConfirm !== undefined) {
        if (password !== passwordConfirm) {
          console.log("passwords do not match")
        } else {
          setPasswordConfirmed(true)
        }
      }
    }
  }, [password, passwordConfirm])

  useEffect(() => {
    if (
      name !== undefined &&
      email !== undefined &&
      passwordConfirmed == true
    ) {
      setRegisterDisabled(false)
    }
  }, [name, email, passwordConfirmed])

  useEffect(() => {
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

  return (
    // <ImageBackground
    //   source={require("../assets/background.jpg")}
    //   resizeMode="cover"
    //   style={{ height: "100%" }}
    // >
    <View style={{ height: "100%" }}>
      <SafeAreaView style={styles.container} behavior={"padding"}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Let's get reading.</Text>
          <View style={styles.emailContainer}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              style={styles.emailIcon}
            />
            <TextInput
              placeholder="First Name"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            ></TextInput>
          </View>

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
            <MaterialIcons
              name="vpn-key"
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
              color={hidePassword ? Colors.black : Colors.black}
            />
          </View>
          <View style={styles.passwordContainer}>
            <Text style={[styles.confirmText]}>Password Confirmation</Text>
            <MaterialIcons
              name="vpn-key"
              size={24}
              color="black"
              style={styles.passwordIcon}
            />
            <TextInput
              secureTextEntry={hidePassword ? true : false}
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text)}
              style={[styles.input, { width: "100%" }]}
            ></TextInput>
            <Feather
              onPress={() => {
                setHidePassword(!hidePassword)
              }}
              style={styles.eyeIcon}
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color={hidePassword ? Colors.black : Colors.black}
            />
          </View>
          {password && (
            <Text
              style={[
                styles.passwordsMustMatch,
                { color: passwordConfirmed ? "green" : "red" },
              ]}
            >
              {passwordConfirmed ? "Passwords match!" : "Passwords must match"}
            </Text>
          )}

          <TouchableOpacity
            disabled={registerDisabled}
            onPress={handleSignUp}
            style={[
              styles.button,
              styles.buttonOutline,
              registerDisabled ? styles.disabledButton : null,
            ]}
          >
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <TouchableOpacity
            onPress={handleRegisterScreen}
            style={styles.signUp}
          >
            <Text style={styles.signUpText}>Already have an account?</Text>
            <Text style={[styles.signUpText]}>Log in.</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* </ImageBackground> */}
    </View>
  )
}

export default RegisterScreen
