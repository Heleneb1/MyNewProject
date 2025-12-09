import { Route, Routes, useLocation } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"

import NavBar from "./components/NavBar"
import Books from "./pages/Books"
import Quotes from "./pages/Quotes"
import Characters from "./pages/Characters"
import Login from "./components/Login"
import SplashPageBook from "./pages/SplashPageBook"
// import "./App.css"
import Test from "./pages/Test"

function App() {
  const location = useLocation()
  const isOnSplash = location.pathname === "/"

  return (
    <div className="App">
      {/* Header visible partout sauf sur "/" */}
      {!isOnSplash && <NavBar />}

      <Routes>
        <Route path="/" element={<SplashPageBook />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default App
