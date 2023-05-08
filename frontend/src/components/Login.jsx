/* eslint-disable no-alert */
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Contact from "./Contact"
// import Box from "../components/Box"
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [, setSignupConfirmPassword] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [userData] = useState([])
  // const token = localStorage.getItem("token")
  console.info("Token", { userData })
  const cookie = localStorage.getItem("cookie")
  console.info("Cookie", cookie)
  // const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const navigate = useNavigate()

  // document.cookie = "auth_token=myAuthTokenValue; path=/"

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
          const userId = res.data.id
          // User is a regular user, redirect to the cart page
          axios.get(`http://localhost:5000/user/${userId}`)
          navigate("/cart")
          setIsLoggedIn(true)
          localStorage.setItem("userId", res.data.id)
          localStorage.setItem("role", res.data.role)
          localStorage.setItem("cart_id", res.data.cart_id)
          localStorage.setItem("auth_token", res.headers["x-access-token"])
          console.info("auth_token", res.headers["x-access-token"])
          alert(JSON.stringify(`Bienvenue ${res.data.user_name}`))
        } else if (res.data.role === 1) {
          // User is an admin, redirect to the admin dashboard
          navigate("/books")
          setIsLoggedIn(true)

          // Save user data and token to local storage

          localStorage.setItem("userId", res.data.id)
          localStorage.setItem("role", res.data.role)
          localStorage.setItem("cart_id", res.data.cart_id)
          localStorage.setItem("auth_token", res.headers["x-access-token"])
          console.info("auth_token", res.headers["x-access-token"])
          alert(JSON.stringify(`Bienvenue ${res.data.user_name}`))
        }
      })
    // .catch((err) => {
    //   console.error(err.response.data)
    //   alert("Identifiants incorrects.")
    // })
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    // Faire une modif pour confirmPassword
    // if (signupPassword !== signupConfirmPassword) {
    //   if (signupPassword !== signupConfirmPassword) {
    //   alert("Les mots de passe ne correspondent pas.")
    //   return
    // }
    console.info(signupEmail)
    axios
      .post("http://localhost:5000/user", {
        user_name: signupName,
        email: signupEmail,
        password: signupPassword,
        // confirmPassword: signupConfirmPassword,
      })
      .then((res) => {
        const userId = res.data.id
        // User is a regular user, redirect to the cart page
        axios.get(`http://localhost:5000/user/${userId}`)
        navigate("/cart")
        setIsLoggedIn(true)
        localStorage.setItem("userId", res.data.id)
        localStorage.setItem("role", res.data.role)
        localStorage.setItem("cart_id", res.data.cart_id)
        localStorage.setItem("auth_token", res.headers["x-access-token"])
        console.info("auth_token", res.headers["x-access-token"])
        alert(JSON.stringify(`Bienvenue ${res.data.user_name}`))
      })
      .catch((err) => {
        console.error(err.response.data)
        alert("Erreur lors de la création du compte.")
      })
  }
  const handleLogoutClick = (e) => {
    e.preventDefault()
    localStorage.removeItem("auth_token")
    alert("Vous êtes déconnecté!")
  }

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
              value={signupPassword}
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
        <div className="Bouton_déco">
          <button className="Bouton" type="button" onClick={handleLogoutClick}>
            Déconnexion
          </button>
        </div>
        {/* <Box /> */}
      </div>
      <Contact />
    </div>
  )
}

export default Login
