import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { Ionicons } from "@expo/vector-icons"
import Colors from "../Constants/Colors"

const TitleIcon = ({ type }) => {
  if (type == "authors") {
    return (
      <Ionicons name="person-circle-outline" size={24} color={Colors.black} />
    )
  }
  return <Ionicons name="book-outline" size={24} color={Colors.black} />
}

export default TitleIcon

const styles = StyleSheet.create({})
