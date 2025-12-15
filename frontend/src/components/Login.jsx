/* eslint-disable no-alert */
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    api
      .post(
        `/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // permet la transmission du cookie
          // ✅ Supprimez complètement le header Authorization ici
        }
      )
      .then((res) => {
        if (res.data.role === 0) {
          navigate('/books');
        } else if (res.data.role === 1) {
          navigate('/books');
        }

        // Save user data and token to local storage
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('cart_id', res.data.cart_id);
        localStorage.setItem('auth_token', res.data.token); // ✅ Ici vous recevez le token

        alert(`Bienvenue ${res.data.user_name} !`);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response.data);
        alert('Identifiants incorrects.');
      });
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    console.info(signupEmail);
    api
      .post(`/user`, {
        user_name: signupName,
        email: signupEmail,
        password: signupPassword,
        // confirmPassword: signupConfirmPassword,
      })
      .then((res) => {
        console.info(res.data);
        alert('Votre compte a été créé avec succes');
        navigate('/books');
      })
      .catch((err) => {
        console.error(err.response.data);
        alert('Erreur lors de la création du compte.');
      });
  };
  const toggle = () => {
    setToggleVisibility(!toggleVisibility);
  };
  function myFunction() {
    const inputs = document.getElementsByClassName('MDP');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type === 'password') {
        inputs[i].type = 'text';
      } else {
        inputs[i].type = 'password';
      }
    }
  }

  return (
    <div className="Login">
      <div className="Connect">
        {toggleVisibility ? (
          <>
            <h2 className="title">Connexion</h2>

            <form
              className="Connexion form-container"
              onSubmit={handleLoginSubmit}
            >
              <div className="form-field">
                <input
                  className="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="password-field">
                <input
                  className="MDP"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input className="check" type="checkbox" onClick={myFunction} />
              </div>

              <div className="Bouton_Connect">
                <button className="Changebook" type="submit">
                  Se connecter
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>Inscription</h2>

            <form className="form-container" onSubmit={handleSignupSubmit}>
              <div className="form-field">
                <input
                  className="user_name"
                  type="text"
                  placeholder="Nom"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>

              <div className="form-field">
                <input
                  className="email"
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>

              <div className="form-field Calendar">
                <label htmlFor="datetime">Date et heure</label>
                <input type="datetime-local" id="datetime" />
              </div>

              <div className="password-field">
                <input
                  className="MDP"
                  type="password"
                  placeholder="Mot de passe"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <input className="check" type="checkbox" onClick={myFunction} />
              </div>

              <div className="password-field">
                <input
                  className="MDP"
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>

              <div className="Bouton_Connect">
                <button className="Changebook" type="submit">
                  Créer un compte
                </button>
              </div>
            </form>
          </>
        )}

        <button type="button" className="toggleButton" onClick={toggle}>
          {toggleVisibility
            ? 'Pas encore de compte ? Inscrivez-vous !'
            : 'Déjà un compte ? Connectez-vous !'}
        </button>
      </div>
    </div>
  );
}

export default Login;
