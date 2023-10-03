import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"

import { Ionicons } from "@expo/vector-icons"
import ReadingProgressBar from "./ReadingProgressBar"

const ReadingProgressInfo = ({ bookProgress, pageCount, progressPercent }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressInfo}>
        <Ionicons name="book-outline" size={20} color="black" />
        <Text>
          <Text style={styles.bold}>{bookProgress}</Text> pages read of{" "}
          <Text style={styles.bold}>{pageCount}</Text>
        </Text>
      </View>
      <ReadingProgressBar num={progressPercent} />
    </View>
  )
}

export default ReadingProgressInfo

const styles = StyleSheet.create({
  progressContainer: { marginTop: 5, width: "80%" },
  progressInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
})
