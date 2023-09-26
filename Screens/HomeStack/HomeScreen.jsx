import { StyleSheet, Text, Platform, View, Dimensions } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import TopBar from "../../Components/TopBar"
import SearchResults from "../../Components/SearchResults"
import Feed from "../../Components/Feed"

import axios from "axios"
import Colors from "../../Constants/Colors"

let ios = Platform.OS == "ios" ? true : false
const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const HomeScreen = () => {
  const [query, setQuery] = useState()
  const [text, setText] = useState()

  const [isSearching, setIsSearching] = useState(false)
  const [bookResults, setBookResults] = useState()
  const [authorResults, setAuthorResults] = useState()
  const [loading, setLoading] = useState(false)

  const handleSearch = (text) => {
    if (text && text.length > 3) {
      setLoading(true)

      //titles
      axios
        .get(`https://openlibrary.org/search.json?title=${text}}`)
        .then((res) => {
          setBookResults(res.data.docs)
          setLoading(false)
        })
      //authors
      axios
        .get(`https://openlibrary.org/search.json?author=${text}}`)
        .then((res) => {
          setAuthorResults(res.data.docs)
          setLoading(false)
        })
      // //authors
      // axios
      //   .get(`https://openlibrary.org/search.json?isbn=${text}}`)
      //   .then((res) => {
      //     setISBNResults(res.data.docs)
      //     setLoading(false)
      //   })
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={[styles.topBarContainer, { height: isSearching ? 130 : 300 }]}
      >
        {!isSearching && (
          <Text style={styles.title}>Find a new book to read.</Text>
        )}
        <TopBar
          loading={loading}
          setLoading={setLoading}
          query={query}
          setQuery={setQuery}
          text={text}
          setText={setText}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          handleSearch={handleSearch}
        />
      </View>
      {isSearching ? (
        <SearchResults
          loading={loading}
          books={bookResults}
          authors={authorResults}
        />
      ) : (
        <Feed />
      )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  topBarContainer: {
    width: windowWidth,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    backgroundColor: Colors.blue,
    paddingTop: ios ? 60 : 30,
  },
  title: {
    fontSize: 40,
    lineHeight: 40,
    fontWeight: "bold",
    maxWidth: 300,
    paddingHorizontal: 10,
    paddingBottom: 20,
    color: Colors.white,
  },
})
