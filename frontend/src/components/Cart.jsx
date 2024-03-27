/* eslint-disable no-shadow */
import axios from "axios"
import React, { useState, useEffect, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader"
import { useConfirmation } from "../context/ConfirmationContext"

export default function Cart() {
  const [cart, setCart] = useState([])
  const [cartId] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)
  const [userId, setUserId] = useState([])
  const [user] = useState([])
  const [book, setBook] = useState(null)
  const [selectedBooks, setSelectedBooks] = useState([])
  const [books, setBooks] = useState([])
  const [, setUserData] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState("")
  const [removeMessage, setRemoveMessage] = useState("")
  const [clearMessage, setClearMessage] = useState("")

  const storedUserId = localStorage.getItem("userId")
  const storedCartId = localStorage.getItem("cart_id")

  console.info("userId", storedUserId)

  console.info("user card", storedCartId)
  console.info("user", user)
  console.info("cartId", cartId)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const { confirm } = useConfirmation()

  // const handleChange = (event) => {
  //   setMessage(event.target.value)
  // }
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    setIsConnected(!!token)
  }, [])

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
        localStorage.setItem("userData cart", response.data.token)
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
        `http://localhost:5000/user/${storedUserId}/cart_id/${storedCartId}`
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
    const bookIdSelect = bookData.id
    // Utiliser 'some' pour vérifier si le livre est déjà dans le panier
    const found = cart.some((item) => item.book_id === bookIdSelect)

    if (found) {
      // Si le livre est déjà dans le panier, afficher l'alerte
      setMessage("Ce livre est déjà dans votre panier")
      console.info("Ce livre est déjà dans votre panier")
    } else {
      setAddedToCart(true)
      const url = `http://localhost:5000/cart/${storedCartId}/user/${storedUserId}`
      const data = {
        book_id: bookIdSelect,
        user_id: storedUserId,
        cart_id: storedCartId,
      }

      axios
        .post(url, data)
        .then((res) => {
          console.info("INFO", res.data)
          setCart((prevCart) => [...prevCart, res.data])
          console.info("New book in cart", cart)
          setMessage(
            `Livre ajouté à votre liste: '${book.title}'. Bonne lecture !!!`
          )
          setClearMessage("")
          setRemoveMessage("")
          setCart((prevCart) => [...prevCart].reverse())
          getData()
        })
        .catch((err) => console.error(err))
    }
    setBook(null)
  }
  // const bookId = cart.map((item) => item.book_id)
  const removeFromSelectedBooks = (bookId) => {
    setSelectedBooks(selectedBooks.filter((id) => id !== bookId))
  }

  const handleConfirm = (bookCart) => {
    axios
      .delete(
        `http://localhost:5000/user/${storedUserId}/cart_id/${storedCartId}/book/${bookCart.book_id}`
      )
      .then(() => {
        // Une fois que la suppression a réussi sur le serveur, mettre à jour l'état local
        setCart((prevCart) =>
          prevCart.filter((item) => item.book_id !== bookCart.book_id)
        )
        removeFromSelectedBooks(bookCart.book_id) // Retirer le livre sélectionné
        console.info(bookCart)
        setRemoveMessage(
          `Ce livre : '${bookCart.titles}' a été retiré de votre liste de lecture`
        )
        setClearMessage("")
        setMessage("")
      })
      .catch((err) => {
        // Gérer les erreurs éventuelles
        console.error(err)
      })
  }
  const removeFromCart = (bookCart) => {
    if (
      confirm(
        `Voulez-vous vraiment retirer ce livre: '${bookCart.titles}'  de votre liste de lecture ?`,
        () => handleConfirm(bookCart) // Utilisation de handleConfirm ici
      )
    ) {
      // Aucun changement nécessaire ici
    }
  }
  // Vider le panier
  const clearCart = () => {
    axios
      .delete(
        `http://localhost:5000/user/${storedUserId}/cart/${storedCartId}`,
        {
          userId: storedUserId,
          cartId: storedCartId,
        }
      )

      .then(() => {
        setCart([]) // Mise à jour de l'état du panier après la suppression réussie
        setClearMessage("Votre panier est vide")
        setRemoveMessage("")
        setMessage("")
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
      {isConnected ? (
        <>
          <h2>Mon panier - {cart.length} Livres</h2>
          <div id="messageCart">
            {message && <p className="message">{message}</p>}
            {removeMessage && <p className="removeMessage">{removeMessage}</p>}
            {clearMessage && <p className="clearMessage">{clearMessage}</p>}
          </div>
          {userId ? (
            <div>
              {cart.length > 0 ? (
                <Suspense fallback={<Loader />}>
                  <ul>
                    {cart.map((carts) => {
                      const book = books.find(
                        (book) => book.id === carts.book_id
                      )
                      return (
                        <li key={carts.id}>
                          {carts.book.title}
                          <img src={book.url_img} alt={book.title} />
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
          <div className="toSelect">
            <select
              value={book ? book.id : ""}
              onChange={(e) => {
                const bookId = parseInt(e.target.value, 10)
                setBook(books.find((book) => book.id === bookId))
                setAddedToCart(false)
              }}
              className="select-style"
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
              className="Changebook"
              type="button"
              disabled={!book || addedToCart}
              onClick={() => addToCart(book)}
            >
              {addedToCart ? "Ajouté au panier" : "Ajouter au panier"}
            </button>{" "}
          </div>
          {cart.length > 0 && (
            <div className="Contenu">
              <h3>Ma liste de livres à lire :</h3>
              <ul>
                <Suspense fallback={<Loader />}>
                  {cart.map((item) => {
                    console.info("Contenu du panier db", item.book_id)
                    // eslint-disable-next-line no-unused-vars
                    const book = books.find((book) => book.id === item.book_id)

                    return (
                      <div className="cartBook">
                        <li key={item.book_id}>
                          <div className="bookTitle">{item.titles}</div>
                          <div className="cartPicture">
                            <img src={item.images} alt={item.titles} />
                          </div>

                          <button
                            className="Changebook"
                            type="button"
                            onClick={() => removeFromCart(item)}
                          >
                            Retirer
                          </button>
                        </li>
                      </div>
                    )
                  })}
                </Suspense>
              </ul>

              <div className="toRemove">
                {cart.length > 0 && (
                  <button
                    className="Changebook"
                    type="button"
                    onClick={() => clearCart()}
                  >
                    Vider le panier
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      )}
    </div>
  )
}
