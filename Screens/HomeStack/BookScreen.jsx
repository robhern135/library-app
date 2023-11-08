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
import axios from "axios"

import { authors_list, handleImage, truncate } from "../../Functions/Functions"

//firebase

import { db } from "../../Firebase/firebase"
import { get, signOut, getAuth } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

import { ENV_API_KEY } from "@env"
import SaveBookModal from "../../Components/SaveBookModal"
import ScreenBar from "../../Components/ScreenBar"
import StartReading from "../../Components/StartReading"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookScreen = ({ route }) => {
  const auth = getAuth()
  const user = auth.currentUser

  const navigation = useNavigation()
  const barcode = route.params ? route.params.barcode : null
  const [loading, setLoading] = useState(true)
  const [bgColor, setBgColor] = useState(Colors.primary)
  const [isBookmarked, setIsBookmarked] = useState(false)
  // const [userData, setUserData] = useState()

  // THE BOOK
  const [book, setBook] = useState()
  // BOTTOM SHEET
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  useEffect(() => {
    if (barcode) {
      getBookByBarcode()
      console.log(`barcode: ${barcode}`)
    } else {
      setBook(route.params.book)
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

  //BOTTOM SHEET
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true)
  }
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false)
  }

  if (book) {
    const { volumeInfo, id } = book
    const {
      title,
      authors,
      pageCount,
      publishedDate,
      description,
      imageLinks,
      categories,
    } = volumeInfo
    let author = authors_list(authors)

    return (
      <View style={styles.container}>
        <ScreenBar
          title={truncate(volumeInfo.title ? volumeInfo.title : "")}
          showBack={true}
          showBookmark={true}
          isBookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
        />
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
          {imageLinks && <BookCover image={handleImage(imageLinks)} />}
          <BookInfo
            title={title}
            authors={author}
            first_publish_year={publishedDate}
            pages={pageCount == 0 ? "N/A" : pageCount}
          />
          <StartReading id={id} userId={user.uid} book={book} />
          <BookStats isbn={barcode ? barcode : null} />
          <BookDesc description={description} categories={categories} />
        </Animated.ScrollView>
        <SaveBookModal
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          handleCloseBottomSheet={handleCloseBottomSheet}
          handleOpenBottomSheet={handleOpenBottomSheet}
          bookId={id}
          userId={user.uid}
        />
      </View>
    )
  }
  return <ActivityIndicator size="large" color={Colors.primary} />
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
