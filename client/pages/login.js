import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./contexts/AuthContext"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function Login(){
    const { user, setUser } = useContext(AuthContext)
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    // validate username and password
    if (!username || !password){
      setErrorMessage('Invalid username or password')
      return
    }
    // TODO SIGN UP REQUEST
    try {
      const response = await fetch(`${SERVER_URL}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      const data = await response.json()

      if (!response.ok){
        setErrorMessage(data.message)
        return
      }
      sessionStorage.setItem('jwt', data.token)
      setUser(data.user)
    } catch (error){
      console.log(error)
      setErrorMessage('')
    }
  }

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    return (
        <div>
            <form className='flex justify-center'>
            <div className='flex flex-col p-5'>
              <input placeholder='username' className='border' onChange={(event) => setUsername(event.target.value)}/>
              <input placeholder='password' className='border' onChange={(event) => setPassword(event.target.value) }/>
              <button onClick={(event) => handleLogin(event)} className='border'>Sign In</button>
            </div>
          </form>
        </div>
    )
}