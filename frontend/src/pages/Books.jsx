/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
// /* eslint-disable react/button-has-type */
// /* eslint-disable camelcase */
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Books() {
  const [books, setBooks] = useState([])
  const [bookId, setBookId] = useState(null)
  const [picture, setPicture] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [newPicture, setNewPicture] = useState(null)
  const inputRef = useRef(null)
  const token = localStorage.getItem("token")
  const uniqueGenres = [...new Set(filteredBooks.map((book) => book.genre))]
  const [formData, setFormData] = useState({
    title: "",
    publication_date: "",
    genre: "",
    images_id: "",
    pages: null,
    description: "",
    books_id: "",
  })

  const navigate = useNavigate()

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
      id: book.id,
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

  const handleImageSubmit = async (event) => {
    event.preventDefault()
    try {
      const imageFormData = new FormData()
      imageFormData.append("avatar", inputRef.current.files[0])
      const imageResponse = await axios.post(
        "http://localhost:5000/avatar",
        imageFormData
      )

      const newBookPicture = imageResponse.data.picture
      if (newBookPicture) {
        const imageData = new FormData()
        imageData.append("name_img", inputRef.current.files[0].name_img)
        imageData.append("url_img", newBookPicture)
        imageData.append("books_id", bookId)
        const addImageResponse = await axios.post(
          "http://localhost:5000/images",
          imageData
        )

        // Ajouter l'ID de l'image au livre
        const bookData = {
          title: formData.title,
          publication_date: formData.publication_date,
          genre: formData.genre,
          pages: formData.pages,
          description: formData.description,
          images_id: addImageResponse.data.id, // Ajouter l'ID de l'image à l'objet bookData
        }

        const response = await axios.post(
          "http://localhost:5000/books",
          bookData
        )
        console.info("Book added successfully:", response.data)
        alert(`Ce livre est ajouté avec succès`)
      }
    } catch (error) {
      console.error("Error while adding image:", error)
      alert("Erreur lors de l'ajout de l'image")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // Upload de l'image
      const imageFormData = new FormData()
      imageFormData.append("avatar", inputRef.current.files[0])
      const imageResponse = await axios.post(
        "http://localhost:5000/avatar",
        imageFormData
      )
      console.info(imageResponse)

      // Récupération des détails de l'image
      const lastImageResponse = await axios.get(
        `http://localhost:5000/images/${imageResponse.data.id}`
      )
      console.info(lastImageResponse)

      // Création du livre
      const bookData = {
        title: formData.title,
        publication_date: formData.publication_date,
        genre: formData.genre,
        pages: formData.pages,
        description: formData.description,
        images_id: lastImageResponse.data.id, // Pass the ID of the selected image
      }
      setFormData({
        ...formData,
        images_id: lastImageResponse.data.id,
      })
      const response = await axios.post("http://localhost:5000/books", bookData)
      console.info("Book added successfully:", response.data)
      alert(`Ce livre est ajouté avec succès`)
      await axios.put(
        `http://localhost:5000/images/${lastImageResponse.data.id}`,
        {
          books_id: response.data.id,
        }
      )
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
      const response = await axios.delete(`http://localhost:5000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // replace `token` with your actual token
        },
      })
      console.info(response.data)
      alert("Le livre a été supprimé de la liste")
    } catch (error) {
      console.error(error)
    }
  }
  const handleFileChange = (evt) => {
    const file = evt.target.files[0]
    setPicture(URL.createObjectURL(file))
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
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="books-container">
          {selectedBook && (
            <div className="modal">
              <div className="modal-content">
                <h2>{selectedBook.title}</h2>
                <p>{selectedBook.description}</p>
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => {
                    setSelectedBook(null)
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}

          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="book">
                <img src={book.url_img} alt={book.title} />
                <h3>{book.title}</h3>
                <div className="info">
                  <p>
                    {book.genre}, {book.publication_date}, {book.pages} pages
                    {localStorage.getItem("role") === "1" ? (
                      <button
                        className="Changebook"
                        type="button"
                        onClick={() => handleDelete(book.id)}
                      >
                        Supprimer
                      </button>
                    ) : null}
                  </p>
                </div>{" "}
                <button
                  className="Changebook"
                  type="button"
                  onClick={() => setSelectedBook(book)}
                >
                  Description
                </button>
              </div>
            ))
          ) : (
            <div className="NoBook">
              <p>Désolé, pas de livre trouvé</p>
            </div>
          )}
        </div>
      </div>
      {localStorage.getItem("role") === "1" ? (
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
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
              type="file"
              name="avatar"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <button type="button" onClick={handleImageSubmit}>
              Envoyer l'image
            </button>
            {picture && <img className="picture" src={picture} alt="Aperçu" />}
          </form>

          <button className="Changebook" type="submit">
            Nouvelle entrée
          </button>
        </form>
      ) : null}
    </div>
  )
}
