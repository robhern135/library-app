import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"

import { Ionicons } from "@expo/vector-icons"
import Colors from "../../Constants/Colors"
import { useNavigation } from "@react-navigation/native"
import BookCover from "../../Components/BookCover"
import BookInfo from "../../Components/BookInfo"
import BookStats from "../../Components/BookStats"
import BookDesc from "../../Components/BookDesc"
import { toDataURL } from "../../Functions/Functions"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
let ios = Platform.OS == "ios" ? true : false

const BookScreen = ({ route }) => {
  const navigation = useNavigation()
  const { book } = route.params

  const {
    title,
    cover_i,
    author_name,
    first_publish_year,
    number_of_pages_median,
    publisher,
    ratings_average,
    ratings_count,
    key,
  } = book

  const [bgColor, setBgColor] = useState(Colors.pink)

  const getBgColor = (image) => {
    toDataURL(image)
  }

  useEffect(() => {
    getBgColor(`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`)
  }, [])

  if (book) {
    let image = cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
      : null
    let authors = Array.isArray(author_name)
      ? author_name.join(", ")
      : author_name

    let publishers = Array.isArray(publisher) ? publisher.join(", ") : publisher

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.actions,
            { paddingTop: ios ? 60 : 30, backgroundColor: bgColor },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={() => console.log("bookmark")}>
            <Ionicons name="bookmark-outline" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            height: windowHeight - 105,
            backgroundColor: Colors.grey,
            paddingTop: 50,
          }}
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 25,
            paddingBottom: 150,
          }}
        >
          {image && <BookCover image={image} />}
          <BookInfo
            title={title}
            authors={authors}
            first_publish_year={first_publish_year}
            pages={number_of_pages_median}
          />
          <BookStats
            publishers={publishers}
            ratings_average={ratings_average}
            ratings_count={ratings_count}
          />
          <BookDesc data={key.replace("/works/", "")} />
        </ScrollView>
      </View>
    )
  }
  return <ActivityIndicator size="large" color={Colors.blue} />
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
