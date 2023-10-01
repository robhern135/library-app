import { Dimensions, Platform, StyleSheet, Text, View } from "react-native"
import React from "react"

import Colors from "../Constants/Colors"
import { Ionicons } from "@expo/vector-icons"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookInfo = ({ title, authors, first_publish_year, pages }) => {
  return (
    <View style={styles.info}>
      <View style={styles.topInfo}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoInner}>
          <View style={styles.authorpublish}>
            <Text style={styles.authors}>{authors}</Text>
            {first_publish_year && (
              <Text style={styles.published}>
                First published: {first_publish_year}
              </Text>
            )}
          </View>
          {pages && (
            <View style={styles.pagesContainer}>
              <Ionicons name="book-sharp" size={24} color="black" />
              <Text style={styles.pages}>{pages}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default BookInfo

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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    paddingRight: 60,
  },
  authorpublish: { flex: 6 },
  authors: { fontSize: 16, color: Colors.black, marginBottom: 5 },
  published: { fontSize: 16, color: Colors.black, opacity: 0.7 },
  infoInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pagesContainer: {
    minWidth: 55,
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})
