import { StyleSheet, Text, View } from "react-native"
import React from "react"
import * as Progress from "react-native-progress"
import Colors from "../Constants/Colors"

const ReadingProgressBar = ({ num }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${num}%` }]}></View>
    </View>
  )
}

export default ReadingProgressBar

const styles = StyleSheet.create({
  progressContainer: {
    marginTop: 5,
    height: 3,
    position: "relative",
    backgroundColor: Colors.grey,
  },
  progressBar: {
    height: 3,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: Colors.blue,
  },
})
