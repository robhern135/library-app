import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from "react-native-reanimated"

import { Ionicons } from "@expo/vector-icons"
import Colors from "../../Constants/Colors"
import { useNavigation } from "@react-navigation/native"
import BookCover from "../../Components/BookCover"
import BookInfo from "../../Components/BookInfo"
import BookStats from "../../Components/BookStats"
import BookDesc from "../../Components/BookDesc"
import { toDataURL } from "../../Functions/Functions"
import axios from "axios"

import { truncate } from "../../Functions/Functions"

import { ENV_API_KEY } from "@env"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookScreen = ({ route }) => {
  const navigation = useNavigation()
  const { barcode } = route.params
  const [loading, setLoading] = useState(true)

  const [book, setBook] = useState(route.params.book ? route.params.book : null)

  useEffect(() => {
    if (barcode) {
      getBookByBarcode()
      console.log(`barcode: ${barcode}`)
    }
  }, [])

  const getBookByBarcode = () => {
    let api_url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}&key=${ENV_API_KEY}`
    console.log(`url: ${api_url}`)

    try {
      axios
        .get(api_url)
        .then((res) => {
          getMainData(res.data.items[0].id)
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(`axios error: ${err}`)
    }
  }

  const getMainData = (id) => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${ENV_API_KEY}`
      )
      .then((res) => {
        console.log(id)
        setBook(res.data)
      })
  }

  const [bgColor, setBgColor] = useState(Colors.pink)

  // const getBgColor = (image) => {
  //   toDataURL(image)
  // }

  // useEffect(() => {
  //   getBgColor(`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`)
  // }, [])

  if (book) {
    const { volumeInfo } = book
    const {
      title,
      authors,
      pageCount,
      publishedDate,
      description,
      imageLinks,
      categories,
    } = volumeInfo
    let author = Array.isArray(authors) ? authors.join(", ") : authors

    // const scrollViewRef = useRef()
    // const scrollY = useSharedValue(0)

    // const scrollHandler = useAnimatedScrollHandler((event) => {
    //   console.log(event.contentOffset.y)
    //   scrollY.value = event.contentOffset.y
    // })

    // const animateTopTitle = useAnimatedStyle(() => {
    //   const inputRange = [250, 500]
    //   return {
    //     opacity: interpolate(
    //       scrollY.value,
    //       inputRange,
    //       [0, 1],
    //       Extrapolate.CLAMP
    //     ),
    //   }
    // })

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.actions,
            { paddingTop: ios ? 60 : 50, backgroundColor: bgColor },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.replace("HomeScreen")}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Animated.Text style={[styles.headerTitle]}>
            {truncate(volumeInfo.title, 30)}
          </Animated.Text>
          <TouchableOpacity onPress={() => console.log("bookmark")}>
            <Ionicons name="bookmark-outline" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          // ref={scrollViewRef}
          // scrollEventThrottle={16}
          // onScroll={scrollHandler}
          style={{
            height: ios ? windowHeight - 105 : windowHeight - 40,
            backgroundColor: Colors.grey,
            paddingTop: 30,
          }}
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 25,
            paddingBottom: 150,
          }}
        >
          {imageLinks && (
            <BookCover
              image={
                imageLinks.thumbnail
                  ? imageLinks.thumbnail
                  : imageLinks.smallThumbnail
              }
            />
          )}
          <BookInfo
            title={title}
            authors={author}
            first_publish_year={publishedDate}
            pages={pageCount == 0 ? "N/A" : pageCount}
          />
          <BookStats isbn={barcode ? barcode : null} />
          <BookDesc description={description} categories={categories} />
        </Animated.ScrollView>
      </View>
    )
  }
  return <ActivityIndicator size="large" color={Colors.pink} />
}

export default BookScreen

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
})
