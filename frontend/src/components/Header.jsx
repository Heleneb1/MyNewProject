import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className="Header">
      <div className="Title">
        <h1>Alexandre Dumas</h1>
        <h3>Métissage et littérature</h3>
      </div>
      <div className="HeaderLinks">
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
          <p className="NavHeader">Quelques Citations</p>
        </Link>
        <Link className="HeaderLink" to="/login">
          <p className="NavHeader">Connexion</p>
        </Link>
      </div>
    </div>
  )
}
