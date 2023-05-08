/* eslint-disable no-shadow */
import axios from "axios"
import React, { useState, useEffect, Suspense } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "./Loader"

export default function Cart() {
  const [cart, setCart] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)
  const [userId, setUserId] = useState([])
  const [book, setBook] = useState(null)
  const [books, setBooks] = useState([])
  const [, setUserData] = useState([])
  const { id } = useParams()
  const storedUserId = localStorage.getItem("userId")

  console.info("userId", storedUserId)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const cartId = localStorage.getItem("cart_id")
  console.info("cartId voilà", cartId)

  useEffect(() => {
    axios
      .post(
        `http://localhost:5000/auth`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((response) => {
        setUserData(response.data)
        console.info("userData c'est le token", response.data)
        setUserId(response.data.id)
        localStorage.setItem("userData", response.data.token)
      })
      .catch((error) => {
        console.error(error)
        navigate("/login")
      })
  }, [token, navigate])
  // }

  // Récupérer les données du panier de l'utilisateur
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/${storedUserId}/cart_id/${cartId}`
      )
      setCart(res.data)

      console.info("Book", res.data)
      if (res.data.length > 0) {
        const bookIds = res.data.map((item) => item.book_id)
        const bookDetails = await axios.get(
          `http://localhost:5000/books?id=${bookIds.join(",")}`
        )
        setBooks(bookDetails.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addToCart = (bookData) => {
    console.info("bookId", bookData.id) // ajouter un info pour vérifier l'ID du livre
    const bookIdSelect = bookData.id
    let found = false
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].book_id === bookData.id) {
        found = true
        break
      }
    }
    if (!found) {
      setAddedToCart(true)
      if (cart.length === 0) {
        axios
          .post(`http://localhost:5000/cart/${id}/user/${storedUserId}`, {
            book_id: bookIdSelect,
            user_id: storedUserId, // Modifié pour inclure l'ID du livre
          })
          .then((res) => {
            console.info("INFO", res.data)
            console.info("cart", cart) // ajouter un info pour vérifier le panier avant la mise à jour
            setCart(res.data) // Use array with the new cart
            console.info("New Book in the cart", bookData.id) // ajouter un info pour vérifier le panier après la mise à jour
            getData() // Mettre à jour la liste
            alert("Livre ajouté à votre liste. Bonne lecture!!!")
          })
          .catch((err) => console.error(err))
      } else {
        // const cartId = cart[0].id
        axios
          .post(`http://localhost:5000/cart/${cartId}/user/${storedUserId}`, {
            book_id: bookIdSelect,
            user_id: storedUserId,
            cart_id: cartId, // Modifié pour inclure l'ID du livre
          })
          .then((res) => {
            console.info("INFO", res.data)
            console.info("cart", cart) // ajouter un info pour vérifier le panier avant la mise à jour
            setCart([...cart, res.data]) // Use spread operator to append new book
            console.info("New book in cart", cart) // ajouter un info pour vérifier le panier après la mise à jour
            getData() // Mettre à jour la liste
            alert("Livre ajouté à votre liste. Bonne lecture!!!")
          })
          .catch((err) => console.error(err))
      }
    }
  }
  // Retirer un livre du panier
  const removeFromCart = (bookCart) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.book_id !== bookCart.book_id)
    )
  }

  // Vider le panier
  const clearCart = () => {
    axios
      .delete(`http://localhost:5000/cart/${cartId}`)
      .then(() => {
        setCart([])
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    if (userId) {
      getData(userId)
    }
  }, [userId])

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err))
  }, [])
  return (
    <div className="All-Cart">
      <h2>Mon panier - {cart.length} Livres</h2>
      {userId ? (
        <div>
          {cart.length > 0 ? (
            <Suspense fallback={<Loader />}>
              <ul>
                {cart.map((carts) => {
                  const book = books.find((book) => book.id === carts.book_id)
                  return (
                    <li key={carts.id}>
                      {carts.book.title}
                      <img src={book.url_img} alt={book.title} />
                      <button
                        className="Bouton"
                        type="button"
                        onClick={() => removeFromCart(carts)}
                      >
                        Retirer
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Suspense>
          ) : (
            <p>Votre panier est vide</p>
          )}
        </div>
      ) : (
        <p>A. Dumas à découvrir ou à redécouvrir...</p>
      )}
      <h2>Liste des livres</h2>
      <select
        value={book ? book.id : ""}
        onChange={(e) => {
          const bookId = parseInt(e.target.value, 10)
          setBook(books.find((book) => book.id === bookId))
          setAddedToCart(false)
        }}
      >
        <option value="">Sélectionner un livre</option>
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
            - <img src={book.url_img} alt={book.title} />
          </option>
        ))}
      </select>
      <button
        className="Bouton"
        type="button"
        disabled={!book || addedToCart}
        onClick={() => addToCart(book)}
      >
        {addedToCart ? "Ajouté au panier" : "Ajouter au panier"}
      </button>{" "}
      {cart.length > 0 && (
        <button className="Bouton" type="button" onClick={() => clearCart()}>
          Vider le panier
        </button>
      )}
      {cart.length > 0 && (
        <div className="Contenu">
          <h3>Ma liste de livres à lire :</h3>
          <ul>
            <Suspense fallback={<Loader />}>
              {cart.map((item) => {
                console.info("Contenu du panier db", item)
                // eslint-disable-next-line no-unused-vars
                const book = books.find((book) => book.id === item.book_id)

                return (
                  <div className="cartBook">
                    <li key={item.book_id}>
                      {item.titles}
                      <div className="cartPicture">
                        <img
                          src={item.images}
                          alt={item.titles}
                          style={{ width: "50px" }}
                        />
                      </div>
                    </li>
                  </div>
                )
              })}
            </Suspense>
          </ul>
        </div>
      )}
    </div>
  )
}
