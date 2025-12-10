import { useState } from "react"
import { Link } from "react-router-dom"
import Encrier from "../assets/encrier.svg"

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="Header">
      {/* Bouton burger */}
      <div className="nav-container">
        {/* Titre */}
        <div className="title-burger">
          <div className="title-with-logo">
            <h1>Alexandre Dumas</h1>
            <img className="encrier" src={Encrier} alt="encrier" />
          </div>
          <h3>Métissage et littérature</h3>
        </div>

        <button
          type="button"
          className={`navbar-burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menu de navigation */}
      <nav className={`HeaderLinks ${isMenuOpen ? "active" : ""}`}>
        <Link className="HeaderLink" to="/about" onClick={closeMenu}>
          <p className="NavHeader">Biographie</p>
        </Link>
        <Link className="HeaderLink" to="/books" onClick={closeMenu}>
          <p className="NavHeader">Oeuvres</p>
        </Link>
        <Link className="HeaderLink" to="/" onClick={closeMenu}>
          <p className="NavHeader">Accueil</p>
        </Link>
        <Link className="HeaderLink" to="/characters" onClick={closeMenu}>
          <p className="NavHeader">Personnages</p>
        </Link>
        <Link className="HeaderLink" to="/quotes" onClick={closeMenu}>
          <p className="NavHeader">Quelques Citations</p>
        </Link>
        <Link className="HeaderLink" to="/login" onClick={closeMenu}>
          <p className="NavHeader">Connexion</p>
        </Link>
      </nav>

      {/* Overlay pour fermer le menu en cliquant à côté */}

      {isMenuOpen && (
        <div
          className="menu-overlay"
          role="button"
          aria-label="Fermer le menu"
          tabIndex={0}
          onClick={closeMenu}
          onKeyDown={(e) => e.key === "Enter" && closeMenu()}
        />
      )}
    </div>
  )
}

export default NavBar
