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
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"

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
  const [bookRead, setBookRead] = useState([])
  const [bookOwn, setBookOwn] = useState([])
  const [bookWant, setBookWant] = useState([])

  useEffect(() => {
    getUsersShelves()
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

  const getUsersShelves = async () => {
    let docRef = doc(db, "users", userId, "shelves", "books")
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      const { read, own, want } = docSnap.data()
      setBookOwn(own ? own : [])
      setBookRead(read ? read : [])
      setBookWant(want ? want : [])
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  const handleOptionPress = (key) => {
    handleBookChange(key)
  }

  const handleBookChange = (shelfName) => {
    let bookRef = doc(db, "users", userId, "shelves", "books")
    if (shelfName == "read") {
      if (bookRead?.includes(bookId)) {
        let newArray = bookRead.filter((v) => v !== bookId)
        setBookRead(newArray)
        updateDoc(bookRef, { read: arrayRemove(bookId) })
      } else {
        setBookRead([bookId, ...bookRead])
        updateDoc(bookRef, { read: arrayUnion(bookId) })
      }
    } else if (shelfName == "own") {
      if (bookOwn?.includes(bookId)) {
        let newArray = bookOwn.filter((v) => v !== bookId)
        setBookOwn(newArray)
        updateDoc(bookRef, { own: arrayRemove(bookId) })
      } else {
        setBookOwn([bookId, ...bookOwn])
        updateDoc(bookRef, { own: arrayUnion(bookId) })
      }
    } else if (shelfName == "want") {
      if (bookWant?.includes(bookId)) {
        let newArray = bookWant.filter((v) => v !== bookId)
        setBookWant(newArray)
        updateDoc(bookRef, { want: arrayRemove(bookId) })
      } else {
        setBookWant([bookId, ...bookWant])
        updateDoc(bookRef, { want: arrayUnion(bookId) })
      }
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isBottomSheetOpen}
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
                  name={
                    check && check.includes(bookId) ? c.iconSelected : c.icon
                  }
                  size={24}
                  color="black"
                />
                <Text style={styles.choiceText}>{c.title}</Text>
              </TouchableOpacity>
            )
          })}

          <Text>{bookId}</Text>
        </View>

        {/* // Section with Information */}
        <Text>read books :{bookRead?.length}</Text>
        <Text>owned books :{bookOwn?.length}</Text>
        <Text>want books :{bookWant?.length}</Text>
        <Text>{userId}</Text>
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
    height: 400,
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
