import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"

import Colors from "../Constants/Colors"
import SearchSection from "./SearchSection"

const SearchResults = ({ books, authors, isbns, loading }) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.purple} />
      ) : (
        <View style={styles.results}>
          <SearchSection books={books} title={"Title Search"} type={"books"} />
          <SearchSection
            books={authors}
            title={"Author Search"}
            type={"authors"}
          />
          {/* <SearchSection books={isbns} title={"ISBN Search"} /> */}
        </View>
      )}
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({
  results: { flex: 1 },
})
