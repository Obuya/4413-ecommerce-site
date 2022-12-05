import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../contexts/AuthContext"
import Link from 'next/link'
import Navbar from "../components/navigation/Navbar"

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
      if (user){
        const { from } = router.query
        if (from) {
          router.push(from)
        } else {
          router.push('/')
        }
      } 
    }, [user])

    return (
      <div className="h-screen bg-gradient-to-r transition-all duration-500 from-pink-500 to-yellow-500">
        <Navbar search={false} loginAndCart={false} />
        <div className="flex justify-center pt-40">
          <div className="border px-20 py-10 rounded-lg bg-white">
            <h1 className="text-center font-semibold text-5xl text-orange-500">Login</h1>
            <form>
                <div className='flex flex-col p-5 gap-y-2'>
                <input 
                  placeholder='username' 
                  className='border rounded-lg px-2 py-1' 
                  onChange={(event) => setUsername(event.target.value)}
                  type={"text"}
                  maxLength={50}
                />
                <input 
                  placeholder='password' 
                  className='border rounded-lg px-2 py-1' 
                  onChange={(event) => setPassword(event.target.value)}
                  type={"password"}
                  maxLength={120}
                />
                <div className="flex justify-center">
                  <button 
                    onClick={(event) => handleLogin(event)} 
                    className='border rounded-lg px-2 bg-orange-500 text-white font-medium'
                  >
                    LOGIN
                  </button>
                </div>
              
                </div>
                {errorMessage && (
                  <div className="font-medium text-red-500 text-center">
                      {errorMessage}
                  </div>
                )}
            </form>
              <div className="px-5 text-center">
              If you do not already an account {' '}
              <Link href={'/signup'}>
                <button className="text-pink-500 font-medium">
                    sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}