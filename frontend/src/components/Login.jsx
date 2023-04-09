/* eslint-disable no-alert */
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Contact from "./Contact"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const token = localStorage.getItem("auth_token")
  console.info("eeeeeeeeeee", token)
  const cookie = localStorage.getItem("cookie")
  console.info("fffffffffffff", cookie)
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
        localStorage.setItem("auth_token", res.headers["x-access-token"])
        alert("Bienvenue !")
      })
      .catch((err) => {
        console.error(err.response.data)
        alert("Identifiants incorrects.")
      })
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    console.info(signupEmail)
    axios
      .post("http://localhost:5000/user", {
        user_name: signupName,
        email: signupEmail,
        password: signupPassword,
        // confirmPassword: signupPassword,
      })
      .then((res) => {
        console.info(res.data)
      })
      .catch((err) => {
        console.error(err.response.data)
        alert("Erreur lors de la création du compte.")
      })
  }

  const handleLogoutClick = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    alert("Vous êtes déconnecté!")
  }

  function myFunction() {
    const x = document.getElementById("MDP")
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }

  return (
    <div className="Login">
      <h2>Connexion</h2>
      <form onSubmit={handleLoginSubmit}>
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
        <div id="MDP">
          <input
            id="MDP"
            type="password"
            name="password"
            placeholder="Mot de Passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className="check" type="checkbox" onClick={() => myFunction()} />
        {!isLoggedIn && (
          <button className="Changebook" type="submit">
            Se connecter
          </button>
        )}
      </form>
      <h2>Inscription</h2>
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
        <input
          id="MDP"
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        {/* <input
          type="password"
          name="password"
          placeholder="Confirm Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        /> */}
        <button className="Changebook" type="submit">
          Créer un compte
        </button>
      </form>
      <br />
      <button className="Changebook" type="button" onClick={handleLogoutClick}>
        Déconnexion
      </button>
      <Contact />
    </div>
  )
}

export default Login
