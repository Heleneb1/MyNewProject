import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useConfirmation } from "../context/ConfirmationContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { confirm } = useConfirmation()
  // const [message, setMessage] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    setIsConnected(!!token)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    const userConfirmed = confirm("Voulez-vous vraiment vous déconnecter?")
    if (userConfirmed) {
      localStorage.clear()
      setIsConnected(false)
      // setMessage("Vous êtes déconnecté!")
      window.location.reload() // Recharge la page après la déconnexion
    }
  }

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
          <Link className="HeaderLink" to="/logout" onClick={handleLogout}>
            <p className="NavHeader">Déconnexion</p>
          </Link>
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
            <Link className="MobileLink" to="/logout" onClick={handleLogout}>
              Déconnexion
            </Link>
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
