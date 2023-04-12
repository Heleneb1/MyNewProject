import { useState, useEffect } from "react"
import axios from "axios"

export default function Quotes() {
  const [quotes, setQuotes] = useState([])
  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quotes")
      setQuotes(response.data)
      console.info("ttttttt", response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération:", error)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div>
      {quotes.map((quote) => (
        <div key={quote.id}>
          <h3>{quote.text}</h3>
          <p>{quote.associated_character}</p>
        </div>
      ))}
    </div>
  )
}
