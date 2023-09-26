import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React from "react"

import Colors from "../Constants/Colors"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookCover = ({ image }) => {
  return (
    <View style={styles.coverContainer}>
      <View style={styles.imageshadow}>
        {image && <Image source={{ uri: image }} style={styles.cover} />}
      </View>
    </View>
  )
}

export default BookCover

const styles = StyleSheet.create({
  coverContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth,
    paddingHorizontal: 20,
  },
  imageshadow: {
    width: 220,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cover: {
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    aspectRatio: 5.5 / 8.7,
  },
})
