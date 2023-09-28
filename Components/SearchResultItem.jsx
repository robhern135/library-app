import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"

import { useNavigation } from "@react-navigation/native"

import Colors from "../Constants/Colors"
import TitleIcon from "./TitleIcon"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const SearchResultItem = ({ book }) => {
  const navigation = useNavigation()

  if (book) {
    const { volumeInfo, id } = book
    const { title, authors, imageLinks, publishedDate } = volumeInfo
    let author = Array.isArray(authors) ? authors.join(", ") : authors
    // const { title, key, author_name, first_publish_year, cover_i } = book

    // let authors = Array.isArray(author_name)
    //   ? author_name.join(", ")
    //   : author_name
    return (
      <TouchableOpacity
        style={styles.resultItem}
        key={id}
        onPress={() => navigation.navigate("BookScreen", { book })}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageLinks?.thumbnail
                ? imageLinks?.thumbnail
                : imageLinks?.smallThumbnail,
            }}
            style={{ borderRadius: 5, width: 70, height: 110 }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.bookTitle}>{title}</Text>
          {authors && <Text style={styles.authors}>{authors}</Text>}

          {publishedDate && (
            <Text style={styles.published}>
              First published: {publishedDate}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    )
  } else {
    return null
  }
}

export default SearchResultItem

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  resultItem: {
    width: windowWidth - 20,
    paddingVertical: 10,
    paddingRight: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  info: { gap: 3, paddingRight: 50 },
  bookTitle: { fontWeight: "bold" },
  published: { color: "grey" },
})
