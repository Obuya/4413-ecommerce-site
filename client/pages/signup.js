import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import Navbar from "../components/navigation/Navbar"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function SignUp(){
  const { user, setUser } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  useEffect(() => {
    // TODO redirect if user already signed in 
    if (user){
      const { from } = router.query
      if (from) {
        router.push(from)
      } else {
        router.push('/profile')
      }
    } 
  }, [user])

  const handleSignUp = async (event) => {
    event.preventDefault()
    // validate username and password
    if (!username || !password){
      setErrorMessage('Invalid username or password')
      return
    }
    // TODO SIGN UP REQUEST
    try {
      const response = await fetch(`${SERVER_URL}/v1/auth/register`, {
        method: 'POST',
        credentials: 'include',
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

  return (
    <div className="h-screen bg-gradient-to-r transition-all duration-500 from-pink-500 to-yellow-500">
      <Navbar search={false} loginAndCart={false} />
      <div className="flex justify-center pt-40">
        <div className="border px-20 py-10 rounded-lg bg-white">
          <h1 className="text-center font-semibold text-5xl text-orange-500">Sign Up</h1>
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
              <input 
                placeholder='email' 
                className='border rounded-lg px-2 py-1' 
                onChange={(event) => setEmail(event.target.value)}
                type={"text"}
                maxLength={50}
              />
              <div className="flex justify-center">
                <button 
                  onClick={(event) => handleSignUp(event)} 
                  className='border rounded-lg px-2 bg-orange-500 text-white font-medium'
                >
                  SIGN UP
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
            If already a user {' '}
            <Link href={'/login'}>
              <button className="text-pink-500 font-medium">
                  sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}