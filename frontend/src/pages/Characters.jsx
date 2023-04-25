import { useState, useEffect } from "react"
import axios from "axios"

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState("")
  const [selectedBook, setSelectedBook] = useState("")
  const [books, setBooks] = useState([])
  const [associations, setAssociations] = useState([])
  const [, setFilteredBook] = useState([])
  const [openModal, setOpenModal] = useState(false)

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

  const handleBookSelection = (e) => {
    setSelectedBook(e.target.value)
    if (e.target.value !== "") {
      setOpenModal(true)
    }
    setFilteredBook([])
  }

  const filteredBooks = associations.filter(
    (association) =>
      association.character === selectedCharacter &&
      (selectedBook === "" || association.book.associated_book === selectedBook)
  )

  const filteredCharacters = books
    .map((book) => book.name_characters)
    .filter((character, index, self) => self.indexOf(character) === index)

  const resetFilters = () => {
    setSelectedCharacter("")
    setSelectedBook("")
    setFilteredBook([])
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelectedBook("")
    resetFilters()
  }

  // code pour supprimer les doublons
  const bookOptions = [
    ...new Set(filteredBooks.map((b) => b.book.associated_book)),
  ]

  return (
    <div className="All">
      <div className="Characters">
        <label htmlFor="character">Filtrer par personnage:</label>
        <select
          id="character"
          name="character"
          value={selectedCharacter}
          onChange={handleCharacterSelection}
          className="select-style"
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
          {bookOptions.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="Charaters_Book"> */}
      {openModal &&
        filteredBooks
          .filter(
            (book, index, self) =>
              index === self.findIndex((b) => b.book.id === book.book.id)
          )
          .map((association) => (
            <div className="Charaters_Book" key={association.book.title}>
              <div className="Charaters_Book_content">
                <h2>{association.book.title}</h2>
                <p>{association.book.description}</p>
                <button
                  className="Charaters_Book_close"
                  type="button"
                  onClick={handleModalClose}
                >
                  Fermer
                </button>
              </div>
            </div>
          ))}
    </div>
  )
}
