import Line from "../assets/head_line.svg"
// import Box from "./Box"

export default function Header() {
  return (
    <div className="Header-All">
      <div className="Header">
        <div className="Title">
          <h1>Alexandre Dumas</h1>
          <img className="Line" src={Line} alt="ligne" />
          <h3>Métissage et littérature</h3>
        </div>
      </div>
      <div className="Test">{/* <Box /> */}</div>
    </div>
  )
}
