/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="Navbar">
      <div
        className="BurgerMenu"
        onClick={toggleMenu}
        role="button"
        // ajouter l'attribut tabIndex="0" pour indiquer que l'élément peut être mis en surbrillance par la touche Tab du clavier.
        tabIndex="0"
      >
        <div className={isOpen ? "BurgerLine Open" : "BurgerLine"}> </div>
        <div className={isOpen ? "BurgerLine Open" : "BurgerLine"}> </div>
        <div className={isOpen ? "BurgerLine Open" : "BurgerLine"}> </div>
      </div>
      <div className={isOpen ? "HeaderLinks Open" : "HeaderLinks"}>
        <Link className="HeaderLink" to="/about">
          <p className="NavHeader">Biographie</p>
        </Link>
        <Link className="HeaderLink" to="/books">
          <p className="NavHeader">Oeuvres</p>
        </Link>
        <Link className="HeaderLink" to="/">
          <p className="NavHeader">Accueil</p>
        </Link>
        <Link className="HeaderLink" to="/characters">
          <p className="NavHeader"> Personnages</p>
        </Link>
        <Link className="HeaderLink" to="/quotes">
          <p className="NavHeader">Citations</p>
        </Link>
        <Link className="HeaderLink" to="/cart">
          <p className="NavHeader">Panier</p>
        </Link>
        <Link className="HeaderLink" to="/login">
          <p className="NavHeader">Connexion</p>
        </Link>
      </div>
      {isOpen && (
        <div className="MobileMenu">
          <Link className="MobileLink" to="/about" onClick={toggleMenu}>
            Biographie
          </Link>
          <Link className="MobileLink" to="/books" onClick={toggleMenu}>
            Oeuvres
          </Link>
          <Link className="MobileLink" to="/" onClick={toggleMenu}>
            Accueil
          </Link>
          <Link className="MobileLink" to="/characters" onClick={toggleMenu}>
            Personnages
          </Link>
          <Link className="MobileLink" to="/quotes" onClick={toggleMenu}>
            Citations
          </Link>
          <Link className="HeaderLink" to="/cart">
            <p className="NavHeader">Panier</p>
          </Link>
          <Link className="MobileLink" to="/login" onClick={toggleMenu}>
            Connexion
          </Link>
        </div>
      )}
    </div>
  )
}
