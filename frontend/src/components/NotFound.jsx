import signature from '../assets/Alexandre_Dumas_Signature.svg.png';

function NotFound() {
  return (
    <div className="notfound">
      <h1>404 - Page non trouvée</h1>
      <img
        className="signature d'Alexandre Dumas"
        src={signature}
        loading="lazy"
        alt="signature d'alexandre dumas"
      />

      <p>Oups ! Cette page n'existe pas ou a été déplacée.</p>
    </div>
  );
}

export default NotFound;
