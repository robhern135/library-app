import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import Colors from "../Constants/Colors"
import { useNavigation } from "@react-navigation/native"

const ReadingProgressButton = ({ userId }) => {
  let navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProgressScreen", { userId: userId })
        }
        style={styles.readingProgress}
      >
        <Text style={styles.readingText}>Reading progress</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReadingProgressButton

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, width: "100%" },
  readingProgress: {
    alignItems: "center",
    backgroundColor: Colors.pink,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 40,
  },
  readingText: { fontSize: 20, fontWeight: "bold", color: Colors.black },
})
