import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  View,
} from "react-native"
import React, { useCallback, useState } from "react"

// import SelectDropdown from 'react-native-select-dropdown'

import { Ionicons } from "@expo/vector-icons"

import { debounce } from "lodash"
import Colors from "../Constants/Colors"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const TopBar = ({
  text,
  setText,
  isSearching,
  setIsSearching,
  handleSearch,
}) => {
  const handleFocus = () => {
    console.log("focusing")
    setIsSearching(true)
  }
  const handleGoBack = () => {
    console.log("go back")
    //unfocuses search bar
    Keyboard.dismiss()
    setIsSearching(false)
    setText(null)
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <View style={styles.container}>
      {isSearching && (
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={handleFocus}
          autoCorrect={false}
          style={[
            styles.input,
            { width: isSearching ? windowWidth - 75 : windowWidth - 40 },
          ]}
          onChangeText={handleTextDebounce}
          value={text}
          placeholder={"Search for a title or author"}
        />
        <Ionicons
          name="search"
          size={24}
          color={Colors.black}
          style={styles.inputicon}
        />
      </View>
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: windowWidth - 40,
    gap: 10,
  },
  input: {
    paddingLeft: 38,
    paddingRight: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    fontSize: 15,
    color: Colors.black,
    height: 40,
    alignItems: "center",
  },
  inputicon: { position: "absolute", top: 8, left: 8 },
})
