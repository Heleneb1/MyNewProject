import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import Encrier from "../assets/encrier.svg"

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  // const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const location = useLocation()

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      setIsConnected(true)
    }
  }, [location])

  // const userConnected = () => {
  //   setIsConnected(!isConnected)
  // }

  return (
    <div className="navbar">
      {/* Bouton burger */}
      <div className="brandt">
        {/* Titre */}
        <div className="title">
          <Link to="/">
            <div className="title-with-logo">
              <h1>Alexandre Dumas</h1>
              <img
                className="encrier"
                loading="lazy"
                src={Encrier}
                alt="encrier"
              />
            </div>
            <h3>Métissage et littérature</h3>
          </Link>
        </div>

        <button type="button" className="burger-icon" onClick={toggleMenu} aria-label="Ouvrir le menu">
          <span />
          <span />
          <span />
        </button>

        {/* </button> */}
      </div>

      {/* Menu de navigation */}
      <nav className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
        <div className={`links ${isMenuOpen ? "open" : ""}`}>
          <Link className="link" to="/about" onClick={closeMenu}>
            Biographie
          </Link>
          <Link className="link" to="/books" onClick={closeMenu}>
            Oeuvres
          </Link>
          <Link className="link" to="/characters" onClick={closeMenu}>
            Personnages
          </Link>
          <Link className="link" to="/quotes" onClick={closeMenu}>
            Citations
          </Link>

          {isConnected ? (
            <Link className="link" to="/logout" onClick={closeMenu}>
              Déconnexion
            </Link>
          ) : (
            <Link className="link" to="/login" onClick={closeMenu}>
              Connexion
            </Link>
          )}

          <Link className="link" to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          {isConnected && (
            <Link className="link" to="/cart" onClick={closeMenu}>
              Panier
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
