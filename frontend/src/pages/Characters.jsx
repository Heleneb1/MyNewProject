import { useState, useEffect } from "react"
import axios from "axios"

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [formData, setFormData] = useState({
    name_characters: "",
    associated_book: "",
    description: "",
  })
  const fetchCharacters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/characters")
      setSelectedCharacter(response.data)
      console.info("ttttttt", response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération:", error)
    }
  }
  useEffect(() => {
    fetchCharacters()
  }, [])
  // eslint-disable-next-line no-unused-vars
  const handleInputChange = (event) => {
    const { name, value } = event.target

    if (name === "characters") {
      const charactersArray = value.split(",")
      setFormData({ ...formData, characters: charactersArray })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  return (
    <div>
      <label htmlFor="character">Filtrer par personnage:</label>
      <select
        id="character"
        name="character"
        value={selectedCharacter}
        onChange={(e) => setSelectedCharacter(e.target.value)}
      >
        <option value="">Tous les personnages</option>
        <option value="Le cardinal de Richelieu">
          Le cardinal de Richelieu
        </option>
        <option value="D'Artagnan">D'Artagnan</option>
        <option value=" Edmond Dantès"> Edmond Dantès</option>
        <option value="Marguerite de Valois">Marguerite de Valois</option>
        <option value="Autre">Autre</option>
      </select>
    </div>
  )
}
