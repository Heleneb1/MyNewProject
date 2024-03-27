import React, { useState, useEffect } from "react"
// import Cookies from "js-cookie"
import { Link } from "react-router-dom"
// import { useConfirmation } from "../context/ConfirmationContext"
import axios from "axios"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [setUserData] = useState({})

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    setIsConnected(!!token)

    if (token) {
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
          localStorage.setItem("userData cart navbar", response.data.token)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // const handleLogout = async () => {
  //   console.info("Tentative de déconnexion")
  //   console.info("isConnected:", isConnected)

  //   if (isConnected) {
  //     console.info("Vous êtes déjà déconnecté")
  //     const userConfirmed = confirm("Voulez-vous vraiment vous déconnecter?")

  //     console.info("userConfirmed:", userConfirmed)

  //     if (userConfirmed) {
  //       try {
  //         await axios.get("http://localhost:5000/auth/logout")
  //         Cookies.clear("auth_token", "token") // Supprime le cookie d'authentification
  //         localStorage.clear() // Supprime le token d'authentification de localStorage
  //         setIsConnected(false) // Met à jour l'état de connexion
  //         window.location.reload() // Recharge la page pour refléter l'état de déconnexion
  //       } catch (error) {
  //         console.error("Erreur lors de la tentative de déconnexion:", error)
  //         // Vous pouvez également choisir de notifier l'utilisateur qu'une erreur s'est produite
  //       }
  //     }
  //   }
  // }
  const handleLogout = () => {
    console.info("Tentative de déconnexion")
    console.info("isConnected:", isConnected)

    if (isConnected) {
      // const userConfirmed = window.confirm(
      //   "Voulez-vous vraiment vous déconnecter?"
      // )
      // console.info("userConfirmed:", userConfirmed)

      // if (userConfirmed) {
      axios
        .get("http://localhost:5000/auth/logout")
        .then(() => {
          console.info(
            "auth_token before removal:"
            // Cookies.get("auth_token")
          )
          // Assurez-vous de fournir les options nécessaires si votre cookie a été défini avec celles-ci.
          // Cookies.remove("auth_token", { path: "/", domain: "localhost" }) // Supprime le cookie
          // console.info("auth_token after removal:", Cookies.get("auth_token")) // Devrait être undefined
          localStorage.clear() // Supprime les données d'authentification de localStorage
          setIsConnected(false) // Met à jour l'état de connexion
          window.location.reload() // Recharge la page pour refléter l'état de déconnexion
        })

        .catch((error) => {
          console.error("Erreur lors de la tentative de déconnexion:", error)
          // Optionnel: notifier l'utilisateur qu'une erreur s'est produite
        })
    }
  }
  //     } else {
  //       console.info("Déconnexion annulée par l'utilisateur.")
  //     }
  //   } else {
  //     console.info("Pas connecté, pas besoin de déconnection.")
  //   }
  // }

  return (
    <div className="Navbar">
      <div
        className="BurgerMenu"
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            toggleMenu()
          }
        }}
        aria-label="Menu"
        role="button"
        tabIndex={0}
      >
        <div className={isOpen ? "BurgerLine Open" : "BurgerLine"} />
        <div className={isOpen ? "BurgerLine Open" : "BurgerLine"} />
        <div className={isOpen ? "BurgerLine Open" : "BurgerLine"} />
      </div>
      <div className={isOpen ? "HeaderLinks Open" : "HeaderLinks"}>
        <Link
          className="HeaderLink"
          to="/about"
          onClick={() => {
            toggleMenu()
            setIsOpen(false)
          }}
        >
          <p className="NavHeader">Biographie</p>
        </Link>
        <Link
          className="HeaderLink"
          to="/books"
          onClick={() => {
            toggleMenu()
            setIsOpen(false)
          }}
        >
          <p className="NavHeader">Oeuvres</p>
        </Link>
        <Link
          className="HeaderLink"
          to="/"
          onClick={() => {
            toggleMenu()
            setIsOpen(false)
          }}
        >
          <p className="NavHeader">Accueil</p>
        </Link>
        <Link
          className="HeaderLink"
          to="/characters"
          onClick={() => {
            toggleMenu()
            setIsOpen(false)
          }}
        >
          <p className="NavHeader">Personnages</p>
        </Link>
        <Link
          className="HeaderLink"
          to="/quotes"
          onClick={() => {
            toggleMenu()
            setIsOpen(false)
          }}
        >
          <p className="NavHeader">Citations</p>
        </Link>
        <Link
          className="HeaderLink"
          to="/cart"
          onClick={() => {
            toggleMenu()
            setIsOpen(false)
          }}
        >
          <p className="NavHeader">Panier</p>
        </Link>
        {isConnected ? (
          <button
            type="button"
            onClick={handleLogout}
            tabIndex="0"
            className="HeaderLink"
            style={{ cursor: "pointer" }}
          >
            <p className="NavHeader">Déconnexion</p>
          </button>
        ) : (
          <Link
            className="HeaderLink"
            to="/login"
            onClick={() => {
              toggleMenu()
              setIsOpen(false)
            }}
          >
            <p className="NavHeader">Connexion</p>
          </Link>
        )}
        <Link
          className="HeaderLink"
          to="/contact"
          onClick={() => {
            toggleMenu()
            setIsOpen(false)
          }}
        >
          <p className="NavHeader">Contact</p>
        </Link>
      </div>
      {isOpen && (
        <div className="MobileMenu">
          <Link className="MobileLink" to="/" onClick={toggleMenu}>
            Accueil
          </Link>
          <Link className="MobileLink" to="/about" onClick={toggleMenu}>
            Biographie
          </Link>
          <Link className="MobileLink" to="/books" onClick={toggleMenu}>
            Oeuvres
          </Link>
          {isConnected ? (
            <button
              type="button"
              onClick={handleLogout}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogout()
              }}
              tabIndex="0"
              className="MobileLink"
            >
              <p>Déconnexion</p>
            </button>
          ) : (
            <Link className="MobileLink" to="/login" onClick={toggleMenu}>
              Connexion
            </Link>
          )}
          <Link className="MobileLink" to="/characters" onClick={toggleMenu}>
            Personnages
          </Link>
          <Link className="MobileLink" to="/quotes" onClick={toggleMenu}>
            Citations
          </Link>
          <Link className="MobileLink" to="/cart" onClick={toggleMenu}>
            Panier
          </Link>
          <Link className="MobileLink" to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
        </div>
      )}
    </div>
  )
}
