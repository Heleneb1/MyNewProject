// SplashPageBook.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function SplashPageBook() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true)
    }, 500)

    // Rediriger vers /home après l'animation
    const redirectTimer = setTimeout(() => {
      navigate("/home")
    }, 4000)

    return () => {
      clearTimeout(openTimer)
      clearTimeout(redirectTimer)
    }
  }, [navigate])

  return (
    <div className={`Book-container ${isOpen ? "open" : ""}`}>
      <div className="Book-left" />
      <div className="Book-leftsecond" />
      {/* Pas de contenu Home ici, juste l'animation */}
    </div>
  )
}
