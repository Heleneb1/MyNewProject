import { useState, useEffect } from "react"
import Home from "./Home"

export default function SplashPageBook() {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    })

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`Book-container ${isOpen ? "open" : ""}`}>
      <div className="Book-left">µ</div>
      <div className="Book-leftsecond">µ</div>

      <div className="splash-home">
        <Home />
      </div>
    </div>
  )
}
