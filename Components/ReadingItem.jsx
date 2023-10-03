import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { authors_list } from "../Functions/Functions"

const ReadingItem = ({ title, progress, id, authors }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {authors && <Text style={styles.authors}>{authors_list(authors)}</Text>}
      {progress && <Text style={styles.progress}>{progress}</Text>}
    </View>
  )
}

export default ReadingItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: { fontSize: 20, fontWeight: "bold" },
})
