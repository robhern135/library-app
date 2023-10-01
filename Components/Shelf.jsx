import { ScrollView, Dimensions, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"

import Colors from "../Constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import BookItem from "./BookItem"

const Shelf = ({ title, icon, data }) => {
  return (
    <View style={styles.shelf}>
      <View style={styles.titleContainer}>
        <Ionicons name={icon} size={24} color={Colors.black} />
        <Text style={styles.shelfTitle}>{title ? title : "Bookshelf"}</Text>
      </View>
      <ScrollView
        style={styles.shelfView}
        contentContainerStyle={{ gap: 10, paddingLeft: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data?.map((bookId) => {
          //get book somewhere
          return <Text key={bookId}>{bookId}</Text>
        })}
      </ScrollView>
    </View>
  )
}

export default Shelf

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  shelfTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
