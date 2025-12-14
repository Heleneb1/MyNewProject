import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import signature from '../assets/Alexandre_Dumas_Signature.svg.png';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('role');
      localStorage.removeItem('cart_id');
      localStorage.removeItem('userId');
      navigate('/', { replace: true });
    };

    const handleCancel = () => {
      navigate(-1);
    };

    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: '15px' }}>
            Souhaitez-vous vraiment vous déconnecter ?
          </p>
          <div
            style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
          >
            <button
              type="button"
              onClick={() => {
                closeToast();
                handleLogout();
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f6d171',
                color: '#1e1d1d',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              Oui
            </button>
            <button
              type="button"
              onClick={() => {
                closeToast();
                handleCancel();
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1e1d1d',
                color: '#f6d171',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Non
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-right',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        theme: 'dark',
        style: {
          color: '#f6d171',
          border: '1px solid #f6d171',
        },
        transition: Bounce,
      }
    );
  }, [navigate]);

  return (
    <>
      <div className="notfound">
        <h1>Déconnexion</h1>
        <img
          className="signature d'Alexandre Dumas"
          src={signature}
          loading="lazy"
          alt="signature d'alexandre dumas"
        />

        <p>Veuillez confirmer votre choix</p>
      </div>
      <ToastContainer />
    </>
  );
}
