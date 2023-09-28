import { StyleSheet, View } from "react-native"
import BookList from "./BookList"

const Feed = () => {
  return (
    <View style={{ paddingBottom: 150 }}>
      <BookList title="Fantasy" query="fantasy" />
      <BookList title="Horror" query="horror" />
      <BookList title="LGBTQ" query="LGBTQ" />
      <BookList title="Music" query="music" />
      <BookList title="History" query="history" />
      <BookList title="Science" query="science" />
      <BookList title="Art" query="art" />
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})
