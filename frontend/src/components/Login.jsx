import React from "react"
import axios from "axios"

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.email.value)
    axios
      .post("http://localhost:/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res.headers["x-access-token"])
        localStorage.setItem("token", res.headers["x-access-token"])
      })
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
      <form onSubmit={handleSubmit}>
        <input
          className="email"
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          id="MDP"
          type="password"
          name="password"
          placeholder="Mot de Passe"
        />
        <input className="check" type="checkbox" onClick={() => myFunction()} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
