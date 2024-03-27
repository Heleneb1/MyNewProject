import React, { useState, useEffect } from "react"
import Pere from "../assets/AlexandreDumasPere.jpg"
import Mère from "../assets/Marie_Louise_Élisabeth_Labouret.jpg"
import Medaillon from "../assets/medaillon4b.jpg"
import AlexandreD from "../assets/Alexandre_Dumas.jpg"
import AlexandreDumas from "../assets/Alexandre_Dumas_Nadar.jpg"
import ScrollToTopButton from "../components/ScrollToTop"

export default function About() {
  const [isMedaillonVisible, setIsMedaillonVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const medaillon = document.querySelector(".Medaillon")
      if (medaillon) {
        const bounding = medaillon.getBoundingClientRect()
        const isTopVisible =
          bounding.top >= 0 && bounding.top <= window.innerHeight
        if (isTopVisible) {
          setIsMedaillonVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="About-All">
      <div className="portrait">
        <img src={AlexandreD} alt="Alexandre Dumas jeune" />
      </div>
      <div className="description">
        <h3>Alexandre Dumas jeune</h3>
      </div>
      <div className="Biography">
        <h3 className="Title">Biographie</h3>
        <p>
          Alexandre Dumas est l'un des plus célèbres écrivains français du XIXe
          siècle, connu pour des œuvres telles que "Les Trois Mousquetaires" et
          "Le Comte de Monte-Cristo". Il est né le 5 thermidor an X (24 juillet
          1802) à Villers-Cotterêts, dans le département de l'Aisne, en France.
          Cependant, pour comprendre les origines d'Alexandre Dumas, il est
          important de se pencher sur celles de son père, également appelé
          Alexandre Dumas.
        </p>
        <p>
          Le père d'Alexandre Dumas était né en 1762 en Haïti, alors appelée
          Saint-Domingue, une colonie française dans les Antilles. Il était le
          fils d'un noble français et d'une esclave africaine. Le père
          d'Alexandre Dumas a commencé sa carrière en tant que soldat et est
          rapidement devenu général sous la Révolution française.
        </p>
        <p>
          {" "}
          Il a combattu dans plusieurs batailles importantes, notamment à Valmy
          et à Jemappes, avant d'être capturé par les Autrichiens en 1792. Il a
          ensuite été emprisonné à Naples pendant deux ans avant d'être libéré
          et de retourner en France. Après la Révolution française, le père
          d'Alexandre Dumas est devenu un partisan de Napoléon Bonaparte et a
          continué à combattre dans les guerres napoléoniennes en Italie et en
          Égypte. Il a finalement été fait comte de l'Empire par Napoléon en
          1806.{" "}
        </p>
        <div className="photo-portrait">
          <img src={AlexandreDumas} alt="Alexandre Dumas portrait" />
        </div>
        <div className="description">
          <h4>Alexandre Dumas portrait photo Nadar</h4>
        </div>
        <p>
          C'est dans ce contexte que le fils d'Alexandre Dumas, également nommé
          Alexandre Dumas, est né en 1802. Son père était absent pendant une
          grande partie de son enfance, mais il a été élevé par sa mère
          Marie-Louise-Élisabeth Labouret, fille de Claude Labouret, aubergiste
          à l’Écu d'or à Villers-Cotterêts et sa grand-mère maternelle. La
          carrière de l'écrivain Alexandre Dumas a commencé à l'âge de 23 ans
          lorsqu'il a déménagé à Paris et a commencé à écrire des pièces de
          théâtre.
        </p>
        <p>
          {" "}
          Il est rapidement devenu un écrivain populaire et a publié plusieurs
          romans à succès, notamment "Les Trois Mousquetaires" en 1844 et "Le
          Comte de Monte-Cristo" en 1845. Alexandre Dumas est décédé le 5
          décembre 1870 à Puys, près de Dieppe, en France, à l'âge de 68 ans.
          Son œuvre continue d'être appréciée par des millions de lecteurs à
          travers le monde et a inspiré de nombreuses adaptations
          cinématographiques et théâtrales.
        </p>
      </div>
      <div className="Medaillon">
        <div className="familyPicture">
          <div className="Picture">
            <div className={`Père ${isMedaillonVisible ? "animated" : ""}`}>
              <img className="FamilyP" src={Pere} alt="son père" />
              {/* </div> */}

              {/* <div className="Père">
              <img className="FamilyP" src={Pere} alt="son père" /> */}
              <div className="Info">
                <h3>Son père</h3>
                <p>
                  Thomas Alexandre Davy de La Pailleterie, dit le général Dumas
                </p>
              </div>
            </div>
            <div className={`Test ${isMedaillonVisible ? "animated" : ""}`}>
              <img className="medaillon" src={Medaillon} alt="médaillon" />
            </div>
            <div className="Mère">
              <img className="FamilyM" src={Mère} alt="sa mère" />
              <div className="Info">
                <h3>Sa mère</h3>
                <p>Marie-Louise Élisabeth Labouret</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  )
}
