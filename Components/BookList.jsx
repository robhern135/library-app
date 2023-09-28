import { ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import axios from "axios"
import BookItem from "./BookItem"

const BookList = ({ title, query }) => {
  const [books, setBooks] = useState()

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = () => {
    let api_url = `https://openlibrary.org/${query}.json?limit=20`
    console.log(`getting books for ${api_url}`)

    axios.get(api_url).then((res) => {
      setBooks(res.data.works)
    })
  }

  if (books) {
    return (
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <ScrollView
          contentContainerStyle={{ paddingLeft: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal
        >
          {books?.map((book, idx) => {
            const { title, key, author_name, cover_i, cover_id } = book
            if (idx <= 20) {
              return (
                <BookItem
                  title={title}
                  key={key}
                  work={key}
                  author_name={author_name}
                  cover={cover_i ? cover_i : cover_id}
                />
              )
            } else return null
          })}
        </ScrollView>
      </View>
    )
  }
  return null
}

export default BookList

const styles = StyleSheet.create({
  container: { paddingTop: 20, flex: 1 },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
})
