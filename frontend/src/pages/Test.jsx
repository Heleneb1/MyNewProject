import axios from "axios"
import React, { useRef } from "react"

export default function Test() {
  const inputRef = useRef(null)

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData()
    formData.append("avatar", inputRef.current.files[0])

    axios
      .post("http://localhost:5000/avatar", formData)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" name="avatar" ref={inputRef} />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  )
}
