import { useState, useEffect } from "react"
import axios from "axios"

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState("")
  const [selectedBook, setSelectedBook] = useState("")
  const [books, setBooks] = useState([])
  const [associations, setAssociations] = useState([])
  const [, setFilteredBook] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/bookshascharacters"
        )
        setBooks(response.data)
      } catch (error) {
        console.error("Erreur lors de la récupération:", error)
      }
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const newAssociations = []
    books.forEach((book) => {
      const character = book.name_characters
      newAssociations.push({ character, book })
    })
    setAssociations(newAssociations)
  }, [books])

  useEffect(() => {
    setFilteredBook([])
  }, [selectedCharacter])

  const handleCharacterSelection = (e) => {
    setSelectedCharacter(e.target.value)
    setSelectedBook("")
  }

  // const handleBookSelection = (e) => {
  //   setSelectedBook(e.target.value)
  // }
  const handleBookSelection = (e) => {
    setSelectedBook(e.target.value)
    const filteredBooks = associations
      .filter(
        (association) =>
          association.character === selectedCharacter &&
          (e.target.value === "" ||
            association.book.associated_book === e.target.value)
      )
      .map((association) => association.book)
    setFilteredBook(filteredBooks)
  }

  const filteredBooks = associations.filter(
    (association) =>
      association.character === selectedCharacter &&
      (selectedBook === "" || association.book.associated_book === selectedBook)
  )

  const filteredCharacters = books
    .map((book) => book.name_characters)
    .filter((character, index, self) => self.indexOf(character) === index)

  return (
    <div>
      <div className="Characters">
        <label htmlFor="character">Filtrer par personnage:</label>
        <select
          id="character"
          name="character"
          value={selectedCharacter}
          onChange={handleCharacterSelection}
        >
          <option value="">Tous les personnages</option>
          {filteredCharacters.map((character) => (
            <option key={character} value={character}>
              {character}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="book">Filtrer par livre:</label>
        <select
          id="book"
          name="book"
          value={selectedBook}
          onChange={handleBookSelection}
        >
          <option value="">Tous les livres</option>
          {filteredBooks.map((association) => (
            <option
              key={association.book.associated_book}
              value={association.book.associated_book}
            >
              {association.book.associated_book}
            </option>
          ))}
        </select>
      </div>
      {filteredBooks
        .filter(
          (book, index, self) =>
            index === self.findIndex((b) => b.book.title === book.book.title)
        )
        .map((association) => (
          <div key={association.book.title}>
            <h2>{association.book.title}</h2>
            <p>{association.book.description}</p>
          </div>
        ))}
    </div>
  )
}
