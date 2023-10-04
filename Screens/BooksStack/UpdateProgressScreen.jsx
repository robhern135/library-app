import { StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import ReadingItem from "../../Components/ReadingItem"

const UpdateProgressScreen = ({ route }) => {
  const { title, authors, id, progress } = route.params
  let navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Update Reading Progress" })
  }, [])

  return (
    <View style={styles.container}>
      <ReadingItem
        title={title}
        progress={progress}
        id={id}
        key={id}
        authors={authors}
        isButton={true}
      />
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
