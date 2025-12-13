import { useEffect, useState } from "react"

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [showSlowMessage, setShowSlowMessage] = useState(false)

  useEffect(() => {
    const slowTimer = setTimeout(() => {
      setShowSlowMessage(true)
    }, 5000)

    const loadTimer = setTimeout(() => {
      setLoading(false)
    }, 8000)

    return () => {
      clearTimeout(slowTimer)
      clearTimeout(loadTimer)
    }
  }, [])

  if (loading) {
    return (
      <div className="load">
        {showSlowMessage
          ? "Veuillez patienter s'il vous plaît... ⏳"
          : "Chargement..."}
      </div>
    )
  }

  return null
}
