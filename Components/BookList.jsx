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
    let api_url = `https://www.googleapis.com/books/v1/volumes?q=subject:${query}`
    axios.get(api_url).then((res) => {
      setBooks(res.data.items)
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
            // const { title, key, authors, cover_i, cover_id } = book
            const volumeInfo = book.volumeInfo
            const bookTitle = volumeInfo.title
            const { id, authors, imageLinks } = volumeInfo
            if (idx <= 20) {
              return (
                <BookItem
                  title={bookTitle}
                  key={idx}
                  // work={key}
                  authors={authors}
                  cover={imageLinks}
                  book={book}
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
