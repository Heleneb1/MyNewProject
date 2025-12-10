/* eslint-disable no-alert */
import React, { useState } from "react"
import axios from "axios"

function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:5000/contact", {
                name,
                email,
                subject,
                message,
            })
            .then(() => {
                setIsSent(true)
                setName("")
                setEmail("")
                setSubject("")
                setMessage("")
            })
            .catch((err) => {
                console.error(err.response.data)
                alert("Une erreur s'est produite lors de l'envoi du message.")
            })
    }

    return (
        <div className="Contact">
            <h2>Contactez-nous</h2>
            {isSent ? (
                <p>Votre message a été envoyé avec succès.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="email">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="subject">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Sujet"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="message">
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button className="Bouton" type="submit">
                        Envoyer
                    </button>
                </form>
            )}
        </div>
    )
}

export default Contact