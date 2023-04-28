import { useState, useEffect } from "react"
import Pere from "../assets/AlexandreDumasPere.jpg"
import Mère from "../assets/Marie_Louise_Élisabeth_Labouret.jpg"
// import Box from "../components/Box"

export default function About() {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    })

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="About-All">
      <div className={`Picture ${isOpen ? "open" : ""}`}>
        <div className="Père">
          <img className="FamilyP" src={Pere} alt="son père" />
          <div className="Info">
            <p>
              Thomas Alexandre Davy de La Pailleterie, dit le général Dumas, son
              père
            </p>
          </div>
        </div>
        <div className="Test">*</div>
        <div className="Mère">
          <img className="FamilyM" src={Mère} alt="sa mère" />
          <div className="Info">
            <p>Marie-Louise Élisabeth Labouret, sa mère </p>
          </div>
        </div>
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
          <br />
          <br /> Le père d'Alexandre Dumas était né en 1762 en Haïti, alors
          appelée Saint-Domingue, une colonie française dans les Antilles. Il
          était le fils d'un noble français et d'une esclave africaine. Le père
          d'Alexandre Dumas a commencé sa carrière en tant que soldat et est
          rapidement devenu général sous la Révolution française.
          <br />
          <br /> Il a combattu dans plusieurs batailles importantes, notamment à
          Valmy et à Jemappes, avant d'être capturé par les Autrichiens en 1792.
          Il a ensuite été emprisonné à Naples pendant deux ans avant d'être
          libéré et de retourner en France. Après la Révolution française, le
          père d'Alexandre Dumas est devenu un partisan de Napoléon Bonaparte et
          a continué à combattre dans les guerres napoléoniennes en Italie et en
          Égypte. Il a finalement été fait comte de l'Empire par Napoléon en
          1806. <br />
          <br />
          C'est dans ce contexte que le fils d'Alexandre Dumas, également nommé
          Alexandre Dumas, est né en 1802. Son père était absent pendant une
          grande partie de son enfance, mais il a été élevé par sa mère
          Marie-Louise-Élisabeth Labouret, fille de Claude Labouret, aubergiste
          à l’Écu d'or à Villers-Cotterêts et sa grand-mère maternelle. La
          carrière de l'écrivain Alexandre Dumas a commencé à l'âge de 23 ans
          lorsqu'il a déménagé à Paris et a commencé à écrire des pièces de
          théâtre.
          <br />
          <br /> Il est rapidement devenu un écrivain populaire et a publié
          plusieurs romans à succès, notamment "Les Trois Mousquetaires" en 1844
          et "Le Comte de Monte-Cristo" en 1845. Alexandre Dumas est décédé le 5
          décembre 1870 à Puys, près de Dieppe, en France, à l'âge de 68 ans.
          Son œuvre continue d'être appréciée par des millions de lecteurs à
          travers le monde et a inspiré de nombreuses adaptations
          cinématographiques et théâtrales.
        </p>
        {/* <h2>Citation célèbre d'Alexandre Dumas</h2> */}

        {/* <p>
          {" "}
          Au fait, cher Maître, vous devez bien vous y connaître en nègres ?{" "}
          <br />
          Mais très certainement. Mon père était un mulâtre, mon grand-père
          était un nègre et mon arrière-grand-père était un singe. Vous voyez,
          Monsieur : ma famille commence où la vôtre finit.
        </p> */}
      </div>
      {/* <Box /> */}
    </div>
  )
}
