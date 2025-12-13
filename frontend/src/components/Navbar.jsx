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
          <Link to={"/"}>
            <div className="title-with-logo">
              <h1>Alexandre Dumas</h1>
              <img className="encrier"
                loading="lazy"
                src={Encrier}
                alt="encrier"
              />
            </div>
            <h3>Métissage et littérature</h3>
          </Link>
        </div>

        {/* <button
          type="button"
          className={`navbar-burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        > */}
        <div className="burger-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* </button> */}
      </div>

      {/* Menu de navigation */}
      <nav className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
        <div className={`links ${isMenuOpen ? "open" : ""}`}>
          <Link className="link" to="/about" onClick={closeMenu}>Biographie</Link>
          <Link className="link" to="/books" onClick={closeMenu}>Oeuvres</Link>
          <Link className="link" to="/characters" onClick={closeMenu}>Personnages</Link>
          <Link className="link" to="/quotes" onClick={closeMenu}>Citations</Link>

          {isConnected ? (
            <Link className="link" to="/logout" onClick={closeMenu}>Déconnexion</Link>
          ) : (
            <Link className="link" to="/login" onClick={closeMenu}>Connexion</Link>
          )}

          <Link className="link" to="/contact" onClick={closeMenu}>Contact</Link>

          {isConnected && (
            <Link className="link" to="/cart" onClick={closeMenu}>Panier</Link>
          )}
        </div>
      </nav>

      {/* Overlay pour fermer le menu en cliquant à côté */}

      {/* {isMenuOpen && (
        <div
          className="menu-overlay"
          role="button"
          aria-label="Fermer le menu"
          tabIndex={0}
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={(e) => e.key === "Enter" && closeMenu()}
        />
      )} */}
    </div>
  )
}

export default NavBar
