import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../contexts/AuthContext"
import Navbar from "../components/navigation/Navbar"

export default function Profile(){
    const { user, SignOut } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!user) router.push('/login', { query: { from: router.pathname }})
    }, [user])

    if (!user) return (<div></div>)
    return (
        <div>
            <Navbar search={false} />
            <h1>Hidden User Profile</h1>
            <div>Username: ${user.username}</div>
            <div>user id: ${user.id}</div>
            <button onClick={SignOut} className='border'>Sign Out</button>
        </div>
    )
}