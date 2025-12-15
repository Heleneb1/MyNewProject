import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function useBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [picture, setPicture] = useState(null);
  const inputRef = useRef(null);

  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    title: '',
    publication_date: '',
    genre: '',
    images_id: '',
    pages: '',
    description: '',
  });

  // -------- Fetch Books ----------
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`, { withCredentials: true });
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // -------- Filtrer ----------
  useEffect(() => {
    if (!selectedGenre) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((b) => b.genre === selectedGenre);
      setFilteredBooks(filtered);
    }
  }, [selectedGenre, books]);

  // -------- Input texte ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // -------- Delete ----------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
      alert('Livre supprimé');
    } catch (err) {
      console.error(err);
    }
  };

  // -------- Upload image ----------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    const imgData = new FormData();
    imgData.append('avatar', inputRef.current.files[0]);

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/avatar`, imgData);
    return res.data.id;
  };
  const handleImageSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageFormData = new FormData();
      imageFormData.append('avatar', inputRef.current.files[0]);
      const imageResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/avatar`,
        imageFormData
      );

      const newBookPicture = imageResponse.data.picture;
      if (newBookPicture) {
        const imageData = new FormData();
        imageData.append('name_img', inputRef.current.files[0].name_img);
        imageData.append('url_img', newBookPicture);
        imageData.append('books_id', bookId);
        const addImageResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/images`,
          imageData
        );

        // Ajouter l'ID de l'image au livre
        const bookData = {
          title: formData.title,
          publication_date: formData.publication_date,
          genre: formData.genre,
          pages: formData.pages,
          description: formData.description,
          images_id: addImageResponse.data.id, // Ajouter l'ID de l'image à l'objet bookData
        };

        const response = await axios.post(
          `{import.meta.env.VITE_BACKEND_URL}/books`,
          bookData
        );
        console.info('Book added successfully:', response.data);
        alert(`Ce livre est ajouté avec succès`);
      }
    } catch (error) {
      console.error('Error while adding image:', error);
      alert("Erreur lors de l'ajout de l'image");
    }
  };
  const resetPicture = () => {
    setPicture(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  // -------- Ajouter un livre ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageId = await uploadImage();

      const imgDetails = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/images/${imageId}`
      );
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/endpoint`, { withCredentials: true })

      const book = {
        ...formData,
        images_id: imgDetails.data.id,
      };

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books`, book);

      // Update image with book ID
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/images/${imgDetails.data.id}`, {
        books_id: res.data.id,
      });

      alert('Livre ajouté !');
      setPicture(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Erreur création livre');
    }
  };

  return {
    books,
    filteredBooks,
    selectedBook,
    setSelectedBook,
    selectedGenre,
    setSelectedGenre,
    uniqueGenres: [...new Set(filteredBooks.map((b) => b.genre))],
    resetPicture,
    inputRef,
    picture,
    formData,

    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleDelete,
  };
}
