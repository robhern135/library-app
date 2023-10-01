import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"

import Colors from "../Constants/Colors"
import TitleIcon from "./TitleIcon"
import SearchResultItem from "./SearchResultItem"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const SearchSection = ({ books, title, type }) => {
  return (
    <View style={styles.resultsContainer}>
      <View style={styles.titleContainer}>
        <TitleIcon type={type} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {books && books.length > 0 ? (
        <ScrollView style={styles.resultsInner}>
          {books?.map((book) => {
            console.log(book)
            return <SearchResultItem key={book.id} book={book} />
          })}
        </ScrollView>
      ) : (
        <View style={styles.noresults}>
          <Text>No results</Text>
        </View>
      )}
    </View>
  )
}

export default SearchSection

const styles = StyleSheet.create({
  resultsContainer: {
    gap: 5,
    width: windowWidth,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: 120,
  },
  titleContainer: {
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 15,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  noresults: { paddingHorizontal: 10 },
})
