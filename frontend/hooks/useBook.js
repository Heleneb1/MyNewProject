import { useEffect, useState, useRef } from "react"
import axios from "axios"

export default function useBooks() {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("")
    const [selectedBook, setSelectedBook] = useState(null)
    const [picture, setPicture] = useState(null)
    const inputRef = useRef(null)

    const token = localStorage.getItem("token")

    const [formData, setFormData] = useState({
        title: "",
        publication_date: "",
        genre: "",
        images_id: "",
        pages: "",
        description: "",
    })

    // -------- Fetch Books ----------
    const fetchBooks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/books")
            setBooks(res.data)
            setFilteredBooks(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    // -------- Filtrer ----------
    useEffect(() => {
        if (!selectedGenre) {
            setFilteredBooks(books)
        } else {
            const filtered = books.filter((b) => b.genre === selectedGenre)
            setFilteredBooks(filtered)
        }
    }, [selectedGenre, books])

    // -------- Input texte ----------
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // -------- Delete ----------
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            fetchBooks()
            alert("Livre supprimé")
        } catch (err) {
            console.error(err)
        }
    }

    // -------- Upload image ----------
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setPicture(URL.createObjectURL(file))
    }

    const uploadImage = async () => {
        const imgData = new FormData()
        imgData.append("avatar", inputRef.current.files[0])

        const res = await axios.post("http://localhost:5000/avatar", imgData)
        return res.data.id
    }

    // -------- Ajouter un livre ----------
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const imageId = await uploadImage()

            const imgDetails = await axios.get(`http://localhost:5000/images/${imageId}`)

            const book = {
                ...formData,
                images_id: imgDetails.data.id,
            }

            const res = await axios.post("http://localhost:5000/books", book)

            // Update image with book ID
            await axios.put(`http://localhost:5000/images/${imgDetails.data.id}`, {
                books_id: res.data.id,
            })

            alert("Livre ajouté !")
            setPicture(null)
            fetchBooks()
        } catch (err) {
            console.error(err)
            alert("Erreur création livre")
        }
    }

    return {
        books,
        filteredBooks,
        selectedBook,
        setSelectedBook,
        selectedGenre,
        setSelectedGenre,
        uniqueGenres: [...new Set(filteredBooks.map((b) => b.genre))],

        inputRef,
        picture,
        formData,

        handleInputChange,
        handleFileChange,
        handleSubmit,
        handleDelete,
    }
}
