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
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>
          Select a book below to update your reading progress.
        </Text>
      </View>
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
            console.log(book)
            const { id, progress, title, author } = book
            return (
              <ReadingItem
                title={title}
                progress={progress}
                id={id}
                key={id}
                authors={author}
              />
            )
          })}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )}
    </View>
  )
}

export default ProgressScreen

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
    flex: 1,
  },
  subtitle: { padding: 20, alignItems: "center" },
  subtitleText: { fontSize: 15, color: Colors.black },
})
