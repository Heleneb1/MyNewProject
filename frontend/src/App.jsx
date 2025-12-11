import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"

import NavBar from "./components/Navbar"
import Books from "./pages/Books"
import Quotes from "./pages/Quotes"
import Characters from "./pages/Characters"
import Login from "./components/Login"
import SplashPageBook from "./pages/SplashPageBook"
import Test from "./pages/Test"
import Cart from "./components/Cart"
import Contact from "./components/Contact"
import Glitter from "./components/Glitter"
import ScrollToTop from "./components/ScrollToTop"
import NotFound from "./components/NotFound"
import Footer from "@components/Footer"


function App() {
  const location = useLocation()
  const isOnSplash = location.pathname === "/"

  return (
    <div className="App">
      {/* Header visible partout sauf sur "/" */}
      {!isOnSplash && (
        <>
          <NavBar />
          <Glitter />
        </>
      )}

      <Routes>
        <Route path="/" element={<SplashPageBook />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/test" element={<Test />} />
      </Routes>

      {!isOnSplash && (
        <>
          <ScrollToTop />
          <Footer />
        </>
      )}

    </div>
  )
}

export default App
