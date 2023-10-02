import {
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"

import { Ionicons } from "@expo/vector-icons"
import Colors from "../Constants/Colors"

import { truncate } from "../Functions/Functions"
import { useNavigation } from "@react-navigation/native"

let ios = Platform.OS == "ios" ? true : false

const ScreenBar = ({
  title,
  showBack,
  showBookmark,
  isBookmarked,
  setIsBookmarked,
  setIsBottomSheetOpen,
}) => {
  const [bgColor, setBgColor] = useState(Colors.pink)
  const navigation = useNavigation()

  return (
    <View
      style={[
        styles.actions,
        { paddingTop: ios ? 60 : 50, backgroundColor: bgColor },
      ]}
    >
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      <Text style={[styles.headerTitle]}>{truncate(title, 30)}</Text>
      {showBookmark ? (
        <TouchableOpacity onPress={() => setIsBottomSheetOpen(true)}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  )
}

export default ScreenBar

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
})
