import { useEffect, useState } from "react"
import Pere from "../assets/AlexandreDumasPere.jpg"
import Mère from "../assets/Marie_Louise_Élisabeth_Labouret.jpg"
import Medaillon from "../assets/medaillon4b.jpg"

export default function FamilyMedaillon() {
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
    // Vérifier immédiatement au montage
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <em>Ses parents</em>
      <div className="Medaillon">
        <div className="familyPicture">
          <div className="Picture">
            <div className={`Père ${isMedaillonVisible ? "animated" : ""}`}>
              <img
                className="FamilyP"
                src={Pere}
                alt="Thomas Alexandre Davy de La Pailleterie son père"
              />
              <div className="picture-description">
                <div className="Info">
                  <h3>Son père</h3>
                  <p>
                    Thomas Alexandre Davy de La Pailleterie, dit le général
                    Dumas
                  </p>
                </div>
              </div>
            </div>

            <div className={`Test ${isMedaillonVisible ? "animated" : ""}`}>
              <img className="medaillon" src={Medaillon} alt="médaillon" />
            </div>

            <div className="Mère">
              <img
                className="FamilyM"
                src={Mère}
                alt="Marie-Louise Élisabeth Labouret, sa mère"
              />
              <div className="picture-description">
                <div className="Info">
                  <h3>Sa mère</h3>
                  <p>Marie-Louise Élisabeth Labouret</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
