import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollViewBase,
} from "react-native"
import React, { useEffect, useState } from "react"
import ScreenBar from "../../Components/ScreenBar"

import { db } from "../../Firebase/firebase"
import { get, signOut, getAuth } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Colors from "../../Constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import Shelf from "../../Components/Shelf"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ShelvesScreen = () => {
  const auth = getAuth()
  const user = auth.currentUser

  const [userId, setUserId] = useState(user.uid)
  const [ownedBooks, setOwnedBooks] = useState([])
  const [wantedBooks, setWantedBooks] = useState([])
  const [readBooks, setReadBooks] = useState([])

  let choices = [
    {
      title: "I Want To Read",
      icon: "bookmarks-outline",
      iconSelected: "bookmarks",
      key: "want",
      data: wantedBooks,
    },
    {
      title: "I Own",
      icon: "ios-book-outline",
      iconSelected: "ios-book",
      key: "own",
      data: ownedBooks,
    },
    {
      title: "I've Read",
      icon: "checkbox-outline",
      iconSelected: "checkbox",
      key: "read",
      data: readBooks,
    },
  ]

  const getUsersShelves = async () => {
    let docRef = doc(db, "users", userId, "shelves", "books")
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      const { read, own, want } = docSnap.data()
      setOwnedBooks(own ? own : [])
      setReadBooks(read ? read : [])
      setWantedBooks(want ? want : [])
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  useEffect(() => {
    getUsersShelves()
  }, [])

  return (
    <View style={styles.container}>
      <ScreenBar title="My Bookshelves" showBack={false} showBookmark={false} />
      <ScrollView
        style={styles.shelves}
        contentContainerStyle={{
          paddingBottom: 150,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {choices &&
          choices?.map((choice) => {
            const { title, data, key, icon } = choice
            return <Shelf title={title} data={data} key={key} icon={icon} />
          })}
      </ScrollView>
    </View>
  )
}

export default ShelvesScreen

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    alignItems: "stretch",
  },
  shelves: { paddingTop: 40 },
})
