import React, { useState, useEffect } from "react"
import axios from "axios"
import Line from "../assets/head_line.svg"
import ScrollToTopButton from "../components/ScrollToTop"

export default function Quotes() {
  const [quotes, setQuotes] = useState([])
  const [filteredQuotes, setFilteredQuotes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quotes")
      setQuotes(response.data)
      setFilteredQuotes(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération:", error)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
  const filterQuotes = (searchTerms) => {
    const filtered = quotes.filter((quote) =>
      removeAccents(quote.text.toLowerCase()).includes(
        removeAccents(searchTerms.toLowerCase())
      )
    )
    setFilteredQuotes(filtered)
  }
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
    filterQuotes(event.target.value)
  }

  return (
    <div>
      <div className="All_Quotes">
        <div className="quotes_title">
          <h2>Quelques citations...</h2>
        </div>
        <p className="quotes_intro">
          Découvrez les citations les plus célébres de l'auteur, ou faîtes une
          recherche par mot-clé
        </p>
        <div className="Find">
          <input
            type="search"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote) => (
            <div className="Quotes" key={quote.id}>
              <h3>{quote.text}</h3>
              <p>{quote.associated_character}</p>
              <div className="Line">
                <img src={Line} alt="ligne entre chaque citation" />
              </div>
            </div>
          ))
        ) : (
          <div>Aucun résultat trouvé pour cette recherche.</div>
        )}
      </div>
      <ScrollToTopButton />
    </div>
  )
}
