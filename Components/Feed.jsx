import { StyleSheet, View } from "react-native"
import BookList from "./BookList"

const Feed = () => {
  return (
    <View style={{ paddingBottom: 150 }}>
      <BookList title="Fantasy" query="subjects/fantasy" />
      <BookList title="Horror" query="subjects/horror" />
      <BookList title="Romance" query="subjects/Romance" />
      <BookList title="Music" query="subjects/music" />
      <BookList title="History" query="subjects/history" />
      <BookList title="Science" query="subjects/science" />
      <BookList title="Art" query="subjects/art" />
      <BookList title="Medicine" query="subjects/medicine" />
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})
