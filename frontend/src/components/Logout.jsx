import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        // On supprime uniquement ce qu’il faut
        localStorage.removeItem("token")
        localStorage.removeItem("auth_token")
        localStorage.removeItem("userId")

        console.log("Vous êtes déconnecté!")
        if (window.confirm("Souhaitez-vous vraiment vous déconnecter ?")) {
        }
        // Redirection immédiate
        navigate("/")
    }, [navigate])

    return null
}

export default Logout
