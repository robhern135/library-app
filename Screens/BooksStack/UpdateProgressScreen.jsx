import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import ReadingItem from "../../Components/ReadingItem"
import { handleDate } from "../../Functions/Functions"

import Colors from "../../Constants/Colors"

//firebase
import { db } from "../../Firebase/firebase"
import { get, signOut, getAuth } from "firebase/auth"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"

let auth = getAuth()

const UpdateProgressScreen = ({ route }) => {
  const { title, authors, id, progress, cover, pageCount, timestamp } =
    route.params
  let navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Update Reading Progress" })
  }, [])

  const [newProgress, setNewProgress] = useState(progress.toString())
  const [userId, setUserId] = useState(auth.currentUser.uid)

  const handleUpdateProgress = () => {
    let bookRef = doc(db, "users", userId, "reading", id)
    updateDoc(
      bookRef,
      {
        progress: newProgress,
      },
      { merge: true }
    ).then(() => console.log("updated"))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {cover && (
        <View style={styles.coverContainer}>
          <View style={styles.imageshadow}>
            <Image source={{ uri: cover }} style={styles.cover} />
          </View>
        </View>
      )}
      <Text style={styles.authors}>{authors}</Text>
      <Text style={styles.authors}>
        started reading: {handleDate(timestamp)}
      </Text>
      <View style={styles.updateProgress}>
        <TextInput
          keyboardType="numeric"
          value={newProgress}
          style={[styles.inputText, styles.input]}
          onChangeText={(value) => setNewProgress(value)}
        />
        <Text style={styles.inputText}>of</Text>
        <Text style={styles.inputText}>{pageCount}</Text>
      </View>
      <TouchableOpacity onPress={handleUpdateProgress}>
        <Text>Update</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UpdateProgressScreen

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "stretch",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    width: "100%",
  },
  coverContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  imageshadow: {
    width: 150,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  cover: {
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    aspectRatio: 5.5 / 8.7,
  },
  authors: {
    width: "100%",
    paddingHorizontal: 20,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 5,
  },
  updateProgress: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    paddingVertical: 40,
  },
  inputText: { fontSize: 40, fontWeight: "bold", opacity: 1 },
  input: {
    color: Colors.primary,
    borderBottomWidth: 2,
    paddingHorizontal: 3,
    borderBottomColor: Colors.primary,
    opacity: 1,
  },
})
