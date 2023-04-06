import Glitter from "@components/Glitter"
import Signature from "../assets/Alexandre_Dumas_Signature.svg.png"

export default function Home() {
  return (
    <div>
      <div className="Presentation">
        <img className="signature" src={Signature} alt="Les 3 mousquetaires" />
        <div className="Texte">
          <p>
            Le site consacré à Alexandre Dumas propose une exploration de sa vie
            et de son œuvre.
            <br />
            <br /> Les visiteurs peuvent découvrir la biographie complète de
            l'écrivain, ainsi que des informations sur ses principales œuvres
            littéraires, notamment des résumés et des analyses.
            <br />
            <br /> En outre, le site présente des galeries d'images de
            personnages de ses romans et de scènes de l'époque, ainsi que des
            citations célèbres tirées de ses livres. <br />
            <br />
            Les amateurs de l'œuvre d'Alexandre Dumas trouveront donc sur ce
            site une mine d'informations et de ressources pour en apprendre
            davantage sur leur auteur préféré.
          </p>
        </div>
      </div>
      <Glitter />
    </div>
  )
}
