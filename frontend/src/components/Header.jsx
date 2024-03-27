import { Link } from "react-router-dom"
import Line from "../assets/head_line.svg"
// import Box from "./Box"
import encrier from "../assets/encrier.svg"

export default function Header() {
  return (
    <div className="Header-All">
      <div className="logoContainer">
        <Link to="/">
          <img
            className="logo"
            aria-label="Retour à l'accueil"
            src={encrier}
            alt="logo"
          />
        </Link>
      </div>
      <div className="Header">
        <div className="Title">
          <h1>Alexandre Dumas</h1>
          <img className="Line" src={Line} alt="ligne" />
          <h2>Métissage et littérature</h2>
        </div>
      </div>
      <div className="Test">{/* <Box /> */}</div>
    </div>
  )
}
