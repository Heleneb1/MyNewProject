/* eslint-disable no-alert */
// /* eslint-disable react/button-has-type */
// /* eslint-disable camelcase */
import { useState, useEffect } from "react"
import axios from "axios"

export default function Books() {
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])
  // const [description, setDescription] = useState("")
  // const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    publication_date: "",
    genre: "",
    images_id: "",
    pages: null,
    description: "",
  })

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books")
      setBooks(response.data)
      console.info("ttttttt", response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération:", error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  // eslint-disable-next-line no-unused-vars
  const handleBookSelection = (book) => {
    // Update form data with selected book's data
    setFormData({
      title: book.title,
      publication_date: book.publication_date,
      genre: book.genre,
      image: book.url_img,
      pages: book.pages,
      description: book.description,
    })
  }

  useEffect(() => {
    fetchBooks()
  }, [selectedGenre])

  useEffect(() => {
    if (!selectedGenre) {
      setFilteredBooks(books)
    } else {
      const filtered = books.filter((book) => book.genre === selectedGenre)
      setFilteredBooks(filtered)
    }
  }, [selectedGenre, books])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/books", formData)
      console.info("Book added successfully:", response.data)

      alert(`Ce livre est ajouté avec succès`)
    } catch (error) {
      console.error("Error while adding book:", error)
      alert("Erreur lors de la création")
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/books/${id}`)
      console.info("Book deleted successfully:", response.data)

      alert(`Le livre a été supprimé avec succès`)
      fetchBooks()
    } catch (error) {
      console.error("Error while deleting book:", error)
      alert("Erreur lors de la suppression du livre")
    }
  }

  return (
    <div className="books-container">
      <div>
        <label className="label" htmlFor="genre">
          Filtrer par genre:
        </label>
        <select
          className="select"
          id="genre"
          name="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Tous les genres</option>
          <option value="Roman historique">Roman Historique</option>
          <option value="Roman d'aventure">Roman d'aventure</option>
          <option value="théatre">Pièce de théâtre</option>
          <option value="romance">Romance</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <div className="books-container">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="book">
                <img src={book.url_img} alt={book.title} />
                <h3>{book.title}</h3>
                <div className="info">
                  <p>
                    {book.genre}, {book.publication_date}, {book.pages} pages
                  </p>
                </div>
                <button
                  className="Changebook"
                  type="button"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>Désolé, pas de livre trouvé</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Date de publication"
          name="publication_date"
          value={formData.publication_date}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Résumé"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Nombre de pages"
          name="pages"
          value={formData.pages}
          onChange={handleInputChange}
        />
        <input
          type="image"
          placeholder="Image"
          name="url_img"
          value={formData.url_img}
          onChange={handleInputChange}
          alt={formData.title}
        />

        <button className="Changebook" type="submit">
          Nouvelle entrée
        </button>
      </form>
    </div>
  )
}
