export const truncate = (str, n) => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str
}

export const authors_list = (authors) => {
  return Array.isArray(authors) ? authors.join(", ") : authors
}

export const handleImage = (cover) => {
  return cover?.thumbnail ? cover?.smallThumbnail : cover?.thumbnail
}
