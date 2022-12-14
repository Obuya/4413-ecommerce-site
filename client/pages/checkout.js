import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../contexts/AuthContext"
import Navbar from "../components/navigation/Navbar"

export default function Checkout(){
    const { user, SignOut, shoppingCart, setShoppingCart } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {

    }, [])

    console.log(shoppingCart)
    return (
        <div>
            Checkout
        </div>
    )
}