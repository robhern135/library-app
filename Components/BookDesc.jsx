import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"

import Colors from "../Constants/Colors"
import { Ionicons } from "@expo/vector-icons"

import axios from "axios"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookDesc = ({ description, categories }) => {
  let subjects = null
  console.log(`typeof desc: ${typeof description}`)
  return (
    <View style={styles.info}>
      <View style={styles.topInfo}>
        {description && (
          <View style={styles.desc}>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        )}
        {description && categories ? (
          <View style={styles.divider}></View>
        ) : null}

        {categories && (
          <View style={styles.pills}>
            {categories?.map((sub, idx) => (
              <View key={idx} style={styles.pill}>
                <Text style={styles.subject}>{sub}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )

  // return (
  //   <View style={styles.container}>
  //     <ActivityIndicator size="large" color={Colors.primary} />
  //   </View>
  // )
}

export default BookDesc

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
  divider: {
    paddingHorizontal: 10,
    height: 2,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginVertical: 20,
  },
  descriptionText: { fontSize: 16 },
  pills: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 6,
    flexWrap: "wrap",
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  subject: { color: Colors.white, fontSize: 14 },
})
