import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Souhaitez-vous vraiment vous déconnecter ?'
    );

    if (confirmed) {
      localStorage.clear(); // plus simple
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  }, [navigate]);

  return null;
}
