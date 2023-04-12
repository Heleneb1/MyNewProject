/* eslint-disable no-alert */
// /* eslint-disable react/button-has-type */
// /* eslint-disable camelcase */
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Books() {
  const [books, setBooks] = useState([])
  const [picture, setPicture] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [imageUrl, setImageUrl] = useState("")
  const [newPicture, setNewPicture] = useState(null)
  const inputRef = useRef(null)
  const token = localStorage.getItem("token")
  const uniqueGenres = [...new Set(filteredBooks.map((book) => book.genre))]
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/books", formData)
      console.info("Book added successfully:", response.data)

      alert(`Ce livre est ajouté avec succès`)
      // navigate("/books")
      const uploadImage = async (file) => {
        const newFormData = new FormData()
        const fileRef = inputRef.current.files[0]
        formData.append("name_img", fileRef, file.name)
        newFormData.append("url_img", file)
        newFormData.append("books_id", response.data.id)
        await axios.post("http://localhost:5000/images", newFormData, {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        })
      }
      // Ajoutez les images avec l'ID de l'artefact (si elles existent)
      if (newPicture) {
        await uploadImage(newPicture)
      }
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
                    {/* {book.description}, */}
                    {book.genre}, {book.publication_date}, {book.pages} pages
                    {/* <button onClick={() => handleBookSelection(book)}>
                      Modifier
                    </button> */}
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
          {/* <input
            type="image"
            placeholder="Image"
            name="url_img"
            value={formData.url_img}
            onChange={handleInputChange}
            alt={formData.title}
          /> */}
          <label htmlFor="image">Couverture</label>
          <input
            action="/books"
            method="post"
            encType="multipart/form-data"
            type="file"
            id="image"
            name="image"
            accept="images/*"
            ref={inputRef}
            onChange={(e) => setPicture(e.target.files[0])}
          />{" "}
          {picture && (
            <img
              className="picture"
              src={URL.createObjectURL(picture)}
              alt="Aperçu"
            />
          )}
          <button className="Changebook" type="submit">
            Nouvelle entrée
          </button>
        </form>
      ) : null}
    </div>
  )
}
