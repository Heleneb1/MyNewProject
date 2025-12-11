/* eslint-disable no-shadow */
import React, { useState, useEffect, Suspense } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader"
import { useConfirmation } from "../context/ConfirmationContext"
import useCart from "../../hooks/useCart"

export default function Cart() {
  const navigate = useNavigate()
  const token = localStorage.getItem("auth_token")
  const storedUserId = localStorage.getItem("userId")
  const storedCartId = localStorage.getItem("cart_id")
  const { confirm } = useConfirmation()

  const [isConnected, setIsConnected] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedToAdd, setSelectedToAdd] = useState(null)

  // hook custom
  const {
    cart,
    books,
    message,
    removeMessage,
    clearMessage,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart(storedUserId, storedCartId)

  useEffect(() => {
    setIsConnected(!!token)
    if (!token) navigate("/login")
  }, [token, navigate])

  const handleRemove = (item) => {
    confirm(
      `Retirer '${item.book.title}' du panier ?`,
      () => removeFromCart(item)
    )
  }

  return (
    <>
      <div className="All-Cart">
        <div className="my-list">
          <h2>Liste des livres</h2>

          {/* select pour ajouter */}
          <select
            className="select-style"
            value={selectedToAdd?.id || ""}
            onChange={(e) => {
              const id = parseInt(e.target.value)
              setSelectedToAdd(books.find((b) => b.id === id))
            }}
          >
            <option value="">Sélectionner un livre</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>

          <button
            className="Changebook"
            disabled={!selectedToAdd}
            onClick={() => {
              addToCart(selectedToAdd)
              setSelectedToAdd(null)
            }}
          >
            Ajouter au panier
          </button>
        </div>


        {isConnected ? (
          <>
            <h2>Mon panier - {cart.length} livres</h2>

            <div id="messageCart">
              {message && <p className="message">{message}</p>}
              {removeMessage && <p className="removeMessage">{removeMessage}</p>}
              {clearMessage && <p className="clearMessage">{clearMessage}</p>}
            </div>

            {/* affichage du panier */}
            {cart.length > 0 ? (
              <div className="Contenu">
                <ul>
                  {cart.map((item) => (
                    <li key={item.book_id} className="cartBook">
                      <div className="bookTitle">{item.book.title}</div>

                      <div className="cartPicture">
                        <img src={item.book.url_img} alt={item.book.title} />
                      </div>

                      <button
                        className="Changebook"
                        type="button"
                        onClick={() => handleRemove(item)}
                      >
                        Retirer
                      </button>

                      {/* ouverture modale */}
                      <button
                        className="Changebook"
                        type="button"
                        onClick={() => setSelectedBook(item.book)}
                      >
                        Détails
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Votre panier est vide</p>
            )}

            {/* vider panier */}
            {cart.length > 0 && (
              <button className="Changebook" onClick={clearCart}>
                Vider le panier
              </button>
            )}
            {/* Modale */}
            {selectedBook && (
              <div className="modal">
                <div className="modal-content">
                  <h2>{selectedBook.title}</h2>
                  <p className="Lettrine">{selectedBook.description}</p>
                  <p>{selectedBook.pages} pages</p>
                  <p>
                    {selectedBook.genre} — {selectedBook.publication_date}
                  </p>

                  <button
                    className="modal-close"
                    onClick={() => setSelectedBook(null)}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Veuillez vous connecter pour accéder à cette page.</p>
        )}
      </div>
    </>
  )
}
