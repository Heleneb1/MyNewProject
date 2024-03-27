/* eslint-disable no-alert */
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  // const token = localStorage.getItem("auth_token")
  // const cookie = localStorage.getItem("cookie")
  // const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    axios
      .post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // permet la transmission du cookie
        }
      )
      .then((res) => {
        if (res.data.role === 0) {
          // User is a regular user, redirect to the books page
          navigate("/books")
        } else if (res.data.role === 1) {
          // User is an admin, redirect to the admin dashboard
          navigate("/books")
        }

        // Save user data and token to local storage
        localStorage.setItem("userId", res.data.id)
        localStorage.setItem("role", res.data.role)
        localStorage.setItem("cart_id", res.data.cart_id)
        localStorage.setItem("auth_token", res.data.token)
        // localStorage.setItem("auth_token", res.headers["x-access-token"])
        alert(`Bienvenue ${res.data.user_name} !`)
        window.location.reload()
      })
      .catch((err) => {
        console.error(err.response.data)
        alert("Identifiants incorrects.")
      })
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    if (signupPassword !== signupConfirmPassword) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }
    console.info(signupEmail)
    axios
      .post("http://localhost:5000/user", {
        user_name: signupName,
        email: signupEmail,
        password: signupPassword,
        // confirmPassword: signupConfirmPassword,
      })
      .then((res) => {
        console.info(res.data)
        alert("Votre compte a été créé avec succes")
        navigate("/books")
      })
      .catch((err) => {
        console.error(err.response.data)
        alert("Erreur lors de la création du compte.")
      })
  }
  // const handleLogoutClick = (e) => {
  //   e.preventDefault()
  //   localStorage.removeItem("token")
  //   localStorage.removeItem("auth_token")
  //   localStorage.clear()
  //   alert("Vous êtes déconnecté!")
  // }

  function myFunction() {
    const inputs = document.getElementsByClassName("MDP")
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type === "password") {
        inputs[i].type = "text"
      } else {
        inputs[i].type = "password"
      }
    }
  }

  return (
    <div className="Login">
      <div className="Connect">
        <h2 className="title">Connexion</h2>
        <form className="Connexion" onSubmit={handleLoginSubmit}>
          <div className="email">
            <input
              className="email"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            className="MDP"
            type="password"
            name="password"
            placeholder="Mot de Passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="check"
            type="checkbox"
            onClick={() => myFunction()}
          />
          {!isLoggedIn && (
            <div className="Bouton_Connect">
              <button className="Changebook" type="submit">
                Se connecter
              </button>
            </div>
          )}
        </form>
      </div>
      <h2>Inscription</h2>
      <div className="Inscrip">
        <form onSubmit={handleSignupSubmit}>
          <div className="user_name">
            <input
              className="user_name"
              type="user_name"
              name="user_name"
              placeholder="Nom"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
          </div>
          <div className="email">
            <input
              className="email"
              type="email"
              name="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>
          <div className="Calendar">
            <label htmlFor="datetime">Date et heure:</label>
            <input type="datetime-local" id="datetime" name="datetime" />
          </div>
          <div className="I_MDP">
            <input
              className="MDP"
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <input
              className="check"
              type="checkbox"
              onClick={() => myFunction()}
            />

            <input
              className="MDP"
              type="password"
              name="confirmPassword"
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
        <br />
        {/* <div className="Bouton_déco">
          <button className="Bouton" type="button" onClick={handleLogoutClick}>
            Déconnexion
          </button>
        </div> */}
      </div>
      {/* <Contact /> */}
    </div>
  )
}

export default Login
