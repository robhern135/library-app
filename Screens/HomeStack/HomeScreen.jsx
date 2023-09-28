import {
  StyleSheet,
  Text,
  Platform,
  View,
  Dimensions,
  ScrollView,
} from "react-native"
import React, { useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import TopBar from "../../Components/TopBar"
import SearchResults from "../../Components/SearchResults"
import Feed from "../../Components/Feed"

import axios from "axios"
import Colors from "../../Constants/Colors"

import { ENV_API_KEY } from "@env"

import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from "react-native-reanimated"

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
        // .get(`https://openlibrary.org/search.json?title=${text}}`)
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}&key=${ENV_API_KEY}&maxResults=25&startIndex=0`
        )
        .then((res) => {
          setBookResults(res.data.items)
          setLoading(false)
        })
      //authors
      // axios
      //   .get(`https://openlibrary.org/search.json?author=${text}}`)
      //   .then((res) => {
      //     setAuthorResults(res.data.docs)
      //     setLoading(false)
      //   })
    }
  }

  //Animation
  const scrollViewRef = useRef()
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    // console.log(event.contentOffset.y)
    scrollY.value = event.contentOffset.y
  })

  const [headerRange, setHeaderRange] = useState([270, 100])
  const [headerRangeSearching, setHeaderRangeSearching] = useState([100, 100])

  const animateTopBar = useAnimatedStyle(() => {
    const inputRange = [0, 250]
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        isSearching ? headerRangeSearching : headerRange,
        Extrapolate.CLAMP
      ),
    }
  })
  const animateTitle = useAnimatedStyle(() => {
    const inputRange = [0, 100]
    return {
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [1, 0],
        Extrapolate.CLAMP
      ),
      top: interpolate(scrollY.value, inputRange, [0, -100], Extrapolate.CLAMP),
    }
  })
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topBarContainer, animateTopBar]}>
        {!isSearching && (
          <Animated.Text style={[styles.title, animateTitle]}>
            Find a new book to read.
          </Animated.Text>
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
      </Animated.View>
      <Animated.ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {isSearching ? (
          <SearchResults loading={loading} books={bookResults} />
        ) : (
          <Feed />
        )}
      </Animated.ScrollView>
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
    paddingRight: 20,
    color: Colors.white,
  },
})
