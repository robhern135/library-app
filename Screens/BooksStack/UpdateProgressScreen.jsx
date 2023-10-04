import { StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import ReadingItem from "../../Components/ReadingItem"
import { handleDate } from "../../Functions/Functions"

const UpdateProgressScreen = ({ route }) => {
  const { title, authors, id, progress, cover, pageCount, timestamp } =
    route.params
  let navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Update Reading Progress" })
  }, [])

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{authors}</Text>
      <Text>{id}</Text>
      <Text>{progress}</Text>
      <Text>{cover}</Text>
      <Text>{pageCount}</Text>
      <Text>started reading: {handleDate(timestamp)}</Text>
    </View>
  )
}

export default UpdateProgressScreen

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "stretch",
  },
})
