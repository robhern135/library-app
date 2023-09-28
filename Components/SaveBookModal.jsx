import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"

import { Ionicons } from "@expo/vector-icons"
import Colors from "../Constants/Colors"

//firebase
import { db } from "../Firebase/firebase"
import { get, signOut, getAuth } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

//TODO - Grab if user has already bookmarked, owned, or read the book and change functionality and icons
const SaveBookModal = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  handleCloseBottomSheet,
  handleOpenBottomSheet,
  bookId,
  userId,
}) => {
  const [bookData, setBookData] = useState()
  const [bookRead, setBookRead] = useState()
  const [bookOwn, setBookOwn] = useState()
  const [bookWant, setBookWant] = useState()

  useEffect(() => {
    // getThisBookStatus()
    getHasWant()
    getHasOwn()
    getHasRead()
  }, [])

  let choices = [
    {
      title: "I Want To Read This",
      icon: "bookmarks-outline",
      iconSelected: "bookmarks",
      key: "want",
    },
    {
      title: "I Own This",
      icon: "ios-book-outline",
      iconSelected: "ios-book",
      key: "own",
    },
    {
      title: "I've Read This",
      icon: "checkbox-outline",
      iconSelected: "checkbox",
      key: "read",
    },
  ]

  const getHasRead = async () => {
    let docRef = doc(db, "users", userId, "shelves", "read", "books", bookId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      setBookRead(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  const getHasOwn = async () => {
    let docRef = doc(db, "users", userId, "shelves", "own", "books", bookId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      setBookOwn(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }
  const getHasWant = async () => {
    let docRef = doc(db, "users", userId, "shelves", "want", "books", bookId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      setBookWant(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  // const getThisBookStatus = async () => {
  //   const docSnap = await getDoc(docRef)
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data())
  //     setBookData(docSnap.data())
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!")
  //   }
  // }

  const handleOptionPress = (key) => {
    if (key == "want") {
      console.log("want")
      handleWant()
    } else if (key == "own") {
      console.log("own")
      handleOwn()
    } else if (key == "read") {
      console.log("read")
      handleRead()
    }
  }

  const handleOwn = () => {
    let shelfName = "own"
    saveNewData(shelfName)
  }
  const handleWant = () => {
    let shelfName = "want"
    saveNewData(shelfName)
  }
  const handleRead = () => {
    let shelfName = "read"
    saveNewData(shelfName)
  }

  const saveNewData = (shelfName) => {
    let addRef = doc(db, "users", userId, "shelves", shelfName, "books", bookId)

    try {
      setDoc(addRef, { updated: new Date(), bookId }, { merge: true }).then(
        () => {
          Alert.alert(`Successfully added to shelf ${shelfName}`)
        }
      )
    } catch (err) {
      console.log(`Error at save: ${err}`)
      Alert.alert(`Error saving to shelf ${shelfName}`)
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      // We use the state here to toggle visibility of Bottom Sheet
      visible={isBottomSheetOpen}
      // We pass our function as default function to close the Modal
      onRequestClose={handleCloseBottomSheet}
    >
      <View style={styles.bottomSheet}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Save to Shelf</Text>
          <TouchableOpacity onPress={handleCloseBottomSheet}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.choices}>
          {choices?.map((c, idx) => {
            let check
            if (c.key == "own") {
              check = bookOwn
            } else if (c.key == "want") {
              check = bookWant
            } else if (c.key == "read") {
              check = bookRead
            }
            return (
              <TouchableOpacity
                onPress={() => handleOptionPress(c.key)}
                key={idx}
                style={styles.choice}
              >
                <Ionicons
                  name={check ? c.iconSelected : c.icon}
                  size={24}
                  color="black"
                />
                <Text style={styles.choiceText}>{c.title}</Text>
              </TouchableOpacity>
            )
          })}
          {/* <TouchableOpacity style={styles.choice}>
            <Ionicons name="bookmarks-outline" size={24} color="black" />
            <Text style={styles.choiceText}>I Want To Read This</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.choice}>
            <Ionicons name="ios-book-outline" size={24} color="black" />
            <Text style={styles.choiceText}>I Own This</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choice}>
            <Ionicons name="checkbox-outline" size={24} color="black" />
            <Text style={styles.choiceText}>I've Read This</Text>
          </TouchableOpacity> */}
          <Text>{bookId}</Text>
        </View>

        {/* // Section with Information */}
      </View>
    </Modal>
  )
}

export default SaveBookModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    flex: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    bottom: 0,
    height: 250,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  title: { fontSize: 25, fontWeight: "bold" },

  choices: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
  },
  choice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey,
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    paddingRight: 40,
    gap: 10,
  },
  choiceText: { fontSize: 16 },
})
