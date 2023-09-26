import { Dimensions, Platform, StyleSheet, Text, View } from "react-native"
import React from "react"

import Colors from "../Constants/Colors"
import { Ionicons } from "@expo/vector-icons"

import { AnimatedCircularProgress } from "react-native-circular-progress"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookStats = ({ publishers, ratings_average, ratings_count }) => {
  if (ratings_average && ratings_count) {
    return (
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <View style={styles.ratings}>
            <AnimatedCircularProgress
              size={70}
              width={3}
              fill={(ratings_average.toFixed(2) / 5) * 100}
              tintColor={Colors.blue}
              backgroundColor={Colors.grey}
              style={{ marginRight: 10 }}
            >
              {() => (
                <Text style={styles.ratingNum}>
                  {ratings_average.toFixed(2)}
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.rating}>
              from {ratings_count} rating{ratings_count > 1 ? "s" : ""}
            </Text>
          </View>
          <View style={styles.publishers}>
            <Text style={styles.title}>Publishers</Text>
            <Text style={styles.publishersText}>{publishers}</Text>
          </View>
        </View>
      </View>
    )
  } else {
    return null
  }
}

export default BookStats

const styles = StyleSheet.create({
  info: { paddingHorizontal: 20, width: windowWidth },
  topInfo: {
    backgroundColor: Colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  ratingNum: { fontWeight: "bold", fontSize: 20 },
  ratings: { flexDirection: "row", alignItems: "center" },
  publishers: { marginTop: 20 },
  rating: { fontSize: 17, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  publishersText: { fontSize: 16, lineHeight: 20 },
})
