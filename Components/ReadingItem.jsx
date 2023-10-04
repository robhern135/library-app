import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"

import { authors_list, handleImage } from "../Functions/Functions"

import { ENV_API_KEY } from "@env"

import axios from "axios"
import Colors from "../Constants/Colors"
import ReadingProgressBar from "./ReadingProgressBar"

import { Ionicons } from "@expo/vector-icons"
import ReadingProgressInfo from "./ReadingProgressInfo"
import { useNavigation } from "@react-navigation/native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ReadingItem = ({ title, progress, id, authors }) => {
  let navigation = useNavigation()
  const [book, setBook] = useState()
  const [bookAuthors, setBookAuthors] = useState(authors)
  const [bookTitle, setBookTitle] = useState(title)
  const [bookCover, setBookCover] = useState()
  const [bookProgress, setBookProgress] = useState(progress)
  const [progressPercent, setProgressPercent] = useState()
  const [pageCount, setPageCount] = useState()

  const getBookById = () => {
    let api_url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${ENV_API_KEY}`
    console.log(api_url)
    axios.get(api_url).then((res) => {
      setBook(res.data)
      bookAuthors == null ? setBookAuthors(res.data.volumeInfo.authors) : null
      bookTitle == null ? setBookTitle(res.data.volumeInfo.title) : null
      setBookCover(res.data.volumeInfo.imageLinks)
      setPageCount(
        res.data.volumeInfo.printedPageCount
          ? res.data.volumeInfo.printedPageCount
          : res.data.volumeInfo.pageCount
      )
    })
  }

  const makeProgress = () => {
    let percent = (bookProgress / pageCount) * 100
    let percentNumber = Math.floor(percent)
    setProgressPercent(percentNumber)
    console.log(percentNumber)
  }

  useEffect(() => {
    makeProgress()
  }, [pageCount])

  useEffect(() => {
    getBookById()
  }, [])

  const handlePress = () => {
    navigation.navigate("UpdateProgressScreen", {
      title,
      authors: authors_list(bookAuthors),
      id,
      progress,
    })
  }

  if (book) {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.coverContainer}>
          <View style={styles.imageshadow}>
            <Image
              source={{ uri: handleImage(bookCover) }}
              style={styles.cover}
            />
          </View>
        </View>
        <View style={styles.bookInfo}>
          {bookTitle && <Text style={styles.title}>{bookTitle}</Text>}
          {bookAuthors && (
            <Text style={styles.authors}>{authors_list(bookAuthors)}</Text>
          )}
          <ReadingProgressInfo
            progressPercent={progressPercent}
            bookProgress={bookProgress}
            pageCount={pageCount}
          />
        </View>
      </TouchableOpacity>
    )
  } else return null
}

export default ReadingItem

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 20,
    paddingRight: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey,
    backgroundColor: Colors.white,
    alignSelf: "center",
    paddingTop: 10,
  },
  bold: { fontWeight: "bold" },
  title: { fontSize: 20, fontWeight: "bold" },
  authors: { fontSize: 15, color: Colors.black, opacity: 0.7 },
  progressText: {},
  coverContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
  bookInfo: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 5,
  },
})
