import { Dimensions, Platform, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"

import Colors from "../Constants/Colors"
import { Ionicons } from "@expo/vector-icons"

import axios from "axios"

import { AnimatedCircularProgress } from "react-native-circular-progress"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookStats = ({ isbn }) => {
  const [stats, setStats] = useState()

  useEffect(() => {
    console.log(`isbn in stats is: ${isbn}`)
    if (isbn) {
      getWorks()
    }
  }, [])

  const getWorks = () => {
    axios.get(`https://openlibrary.org/isbn/${isbn}.json`).then((res) => {
      getBookStats(res.data.works[0].key)
    })
  }

  const getBookStats = (id) => {
    let workKey = id.replace("/works/", "")
    axios
      .get(`https://openlibrary.org/search.json?q=${workKey}`)
      .then((res) => {
        let stats = res.data.docs[0]
        setStats({
          ratings_average: stats.ratings_average,
          ratings_count: stats.ratings_count,
          publisher: stats.publisher,
        })
      })
  }

  const handlePublishers = (publishers) => {
    return Array.isArray(stats.publisher)
      ? stats.publisher.join(", ")
      : stats.publisher
  }

  if (stats?.ratings_average && stats?.ratings_count) {
    return (
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <View style={styles.ratings}>
            <AnimatedCircularProgress
              size={70}
              width={3}
              fill={(stats.ratings_average.toFixed(2) / 5) * 100}
              tintColor={Colors.blue}
              backgroundColor={Colors.grey}
              style={{ marginRight: 10 }}
            >
              {() => (
                <Text style={styles.ratingNum}>
                  {stats.ratings_average.toFixed(2)}
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.rating}>
              from {stats.ratings_count} rating
              {stats.ratings_count > 1 ? "s" : ""}
            </Text>
          </View>
          <View style={styles.publishers}>
            <Text style={styles.title}>Publishers</Text>
            <Text style={styles.publishersText}>
              {handlePublishers(publishers)}
            </Text>
          </View>
        </View>
      </View>
    )
  } else {
    return null
  }
}

export default BookStats

const styles = StyleSheet.create({
  info: { paddingHorizontal: 20, width: windowWidth },
  topInfo: {
    backgroundColor: Colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  ratingNum: { fontWeight: "bold", fontSize: 20 },
  ratings: { flexDirection: "row", alignItems: "center" },
  publishers: { marginTop: 20 },
  rating: { fontSize: 17, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  publishersText: { fontSize: 16, lineHeight: 20 },
})
