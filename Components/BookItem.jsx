import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"

import Colors from "../Constants/Colors"

import { truncate } from "../Functions/Functions"
import { useNavigation } from "@react-navigation/native"

const BookItem = ({ title, authors, cover, book }) => {
  let navigation = useNavigation()
  let authors_list = Array.isArray(authors) ? authors.join(", ") : authors
  let image = cover?.thumbnail ? cover?.smallThumbnail : cover?.thumbnail
  return (
    <TouchableOpacity
      underlayColor={"white"}
      style={styles.bookItem}
      onPress={() => {
        navigation.navigate("BookScreen", { book: book })
      }}
    >
      {image && (
        <View style={styles.coverContainer}>
          <View style={styles.imageshadow}>
            <Image source={{ uri: image }} style={styles.cover} />
          </View>
        </View>
      )}
      {title && <Text style={styles.title}>{truncate(title, 30)}</Text>}
      {authors_list && (
        <Text style={styles.author}>{truncate(authors_list, 35)}</Text>
      )}
    </TouchableOpacity>
  )
}

export default BookItem

const styles = StyleSheet.create({
  bookItem: {
    width: 140,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  coverContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageshadow: {
    width: 90,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  cover: {
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    aspectRatio: 5.5 / 8.7,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  author: { textAlign: "center" },
})
