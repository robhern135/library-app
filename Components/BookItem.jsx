import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"

import Colors from "../Constants/Colors"

import { truncate } from "../Functions/Functions"

const BookItem = ({ title, author_name, cover }) => {
  let image = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`
  let authors = Array.isArray(author_name)
    ? author_name.join(", ")
    : author_name
  return (
    <View style={styles.bookItem}>
      {image && (
        <View style={styles.coverContainer}>
          <View style={styles.imageshadow}>
            <Image source={{ uri: image }} style={styles.cover} />
          </View>
        </View>
      )}
      {title && <Text style={styles.title}>{truncate(title, 30)}</Text>}
      {authors && <Text style={styles.author}>{truncate(authors, 35)}</Text>}
    </View>
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
