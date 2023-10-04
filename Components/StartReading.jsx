import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import Colors from "../Constants/Colors"

import { db } from "../Firebase/firebase"
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
  serverTimestamp,
} from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"

const StartReading = ({ id, userId, book }) => {
  let navigation = useNavigation()

  const [readingBooks, setReadingBooks] = useState([])
  const [wantBooks, setWantBooks] = useState([])
  const [readingThisBook, setReadingThisBook] = useState(false)

  const getUsersShelves = async () => {
    //want books
    let docRef = doc(db, "users", userId, "shelves", "books")
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      const { reading, want } = docSnap.data()
      setWantBooks(want ? want : [])
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
    //reading books
    let readingRef = collection(db, "users", userId, "reading")
    const readingSnapshot = await getDocs(readingRef)
    let readingArray = []
    readingSnapshot.forEach((doc) => {
      // doc.data() is never undefined for reading doc snapshots
      console.log(doc.id, " => ", doc.data())
      readingArray = [...readingArray, doc.data()]
    })
    console.log("readingArray is below")
    console.log(readingArray)
    setReadingBooks(readingArray)
    if (readingArray.some((book) => book.id === id)) {
      setReadingThisBook(true)
    }
  }

  useEffect(() => {
    getUsersShelves()
  }, [])

  const handleStartReading = () => {
    console.log("start reading")
    let bookRef = doc(db, "users", userId, "reading", id)
    //**add to reading shelf
    // if (!readingBooks?.includes(id)) {
    setDoc(bookRef, {
      id: id,
      progress: 0,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      pageCount: book.volumeInfo.printedPageCount
        ? book.volumeInfo.printedPageCount
        : book.volumeInfo.pageCount,
      cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks : null,
      timestamp: serverTimestamp(),
    }).then(() => console.log("added"))

    // }
    //remove from reading shelf
    // if (readingBooks?.includes(bookId)) {
    //   let newArray = readingBooks.filter((v) => v !== bookId)
    //   setReadingBooks(newArray)
    //   updateDoc(bookRef, { reading: arrayRemove(bookId) }).then(() => {
    //     Alert.alert(`Successfully removed from currently reading shelf`)
    //   })
    // }
    //**remove from want to read shelf

    let wantRef = doc(db, "users", userId, "shelves", "books")

    if (wantBooks?.includes(id)) {
      let newArray = wantBooks.filter((v) => v !== id)
      setWantBooks(newArray)
      updateDoc(wantRef, { want: arrayRemove(id) })
    }
    navigation.navigate("BooksStack", {
      screen: "ProgressScreen",
      params: { book: book, userId: userId },
    })
  }

  const handleUpdateProgress = () => {
    navigation.navigate("BooksStack", {
      screen: "ProgressScreen",
      params: { book: book, userId: userId },
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.startReading}
        onPress={() =>
          readingThisBook ? handleUpdateProgress() : handleStartReading()
        }
      >
        {id && (
          <>
            <Text style={styles.readingText}>
              {readingThisBook ? "Update reading progress" : "Start reading"}
            </Text>
            <Text style={styles.readingText}>{id}</Text>
          </>
        )}
      </TouchableOpacity>
      <Text>is reading: {readingThisBook ? "true" : "false"}</Text>
    </View>
  )
}

export default StartReading

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, width: "100%" },
  startReading: {
    alignItems: "center",
    backgroundColor: Colors.pink,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  readingText: { fontSize: 20, fontWeight: "bold", color: Colors.black },
})
