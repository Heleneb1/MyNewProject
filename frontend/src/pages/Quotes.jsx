import { useState, useEffect } from "react"
import axios from "axios"
import Line from "../assets/head_line.svg"

export default function Quotes() {
  const [quotes, setQuotes] = useState([])
  const [filteredQuotes, setFilteredQuotes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quotes")
      setQuotes(response.data)
      setFilteredQuotes(response.data)
      console.info("ttttttt", response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération:", error)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])
  const handleSearch = () => {
    const filtered = quotes.filter((quote) =>
      quote.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredQuotes(filtered)
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <div className="All_Quotes">
        <div className="Find">
          <input
            type="search"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="Changebook" type="button" onClick={handleSearch}>
            Rechercher
          </button>
        </div>
        {filteredQuotes.length > 0
          ? filteredQuotes.map((quote) => (
              <div className="Quotes">
                <div key={quote.id}>
                  <h3>{quote.text}</h3>
                  <p>{quote.associated_character}</p>
                  <div className="Line">
                    <img src={Line} alt="ligne entre chaque citation" />
                  </div>
                </div>
              </div>
            ))
          : quotes.map((quote) => (
              <div key={quote.id}>
                <h3>{quote.text}</h3>
                <p>{quote.associated_character}</p>
              </div>
            ))}
      </div>
    </div>
  )
}
