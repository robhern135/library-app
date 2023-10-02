import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"

import axios from "axios"

import { ENV_API_KEY } from "@env"
import { truncate, authors_list, handleImage } from "../Functions/Functions"
import Colors from "../Constants/Colors"
import { useNavigation } from "@react-navigation/native"

const ShelfItem = ({ id }) => {
  const [book, setBook] = useState()
  let navigation = useNavigation()

  const getBookById = () => {
    let api_url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${ENV_API_KEY}`
    console.log(api_url)
    axios.get(api_url).then((res) => {
      setBook(res.data)
    })
  }

  useEffect(() => {
    getBookById()
  }, [])

  if (book) {
    const {
      volumeInfo: { title, authors, imageLinks },
    } = book
    let image = handleImage(imageLinks)
    let authorsList = authors_list(authors)
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HomeStack", {
            screen: "BookScreen",
            params: { book: book },
          })
        }
        style={styles.bookItem}
      >
        {image && (
          <View style={styles.coverContainer}>
            <View style={styles.imageshadow}>
              <Image source={{ uri: image }} style={styles.cover} />
            </View>
          </View>
        )}
        {title && <Text style={styles.title}>{truncate(title, 30)}</Text>}
        {authors && (
          <Text style={styles.author}>{truncate(authorsList, 30)}</Text>
        )}
      </TouchableOpacity>
    )
  }

  return null
}

export default ShelfItem

const styles = StyleSheet.create({
  bookItem: {
    width: 160,
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
    width: 110,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
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
