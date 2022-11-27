import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./contexts/AuthContext"

export default function SignIn(){
    const { user } = useContext(AuthContext)
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        //if (user) router.push('/')
    }, [user])

    return (
        <div>
            <form className='flex justify-center'>
            <div className='flex flex-col p-5'>
              <input placeholder='username' className='border'/>
              <input placeholder='password' className='border'/>
              <button onClick={(event) => handleSignIn(event)} className='border'>Sign In</button>
            </div>
          </form>
        </div>
    )
}