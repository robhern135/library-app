import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import ScreenBar from "../../Components/ScreenBar"

import { db } from "../../Firebase/firebase"
import { get, signOut, getAuth } from "firebase/auth"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore"
import Colors from "../../Constants/Colors"
import ReadingItem from "../../Components/ReadingItem"

const ProgressScreen = ({ route }) => {
  const { userId } = route.params
  const [readingBooks, setReadingBooks] = useState([])
  const [readingThisBook, setReadingThisBook] = useState(false)

  const getReadingBooks = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "reading")
    )
    let newArray = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data())
      newArray = [...newArray, doc.data()]
    })
    setReadingBooks(newArray)
  }

  useEffect(() => {
    getReadingBooks()
  }, [])

  return (
    <View style={styles.container}>
      <ScreenBar
        title="Reading Progress"
        showBack={true}
        showBookmark={false}
      />
      {readingBooks ? (
        <ScrollView
          style={styles.progressContainer}
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 0,
          }}
        >
          {readingBooks?.map((book) => {
            const { id, progress, title } = book
            return (
              <ReadingItem title={title} progress={progress} id={id} key={id} />
            )
          })}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color={Colors.blue} />
      )}
    </View>
  )
}

export default ProgressScreen

const styles = StyleSheet.create({
  alignItems: "flex-start",
  justifyContent: "stretch",
})
