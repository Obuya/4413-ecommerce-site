import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useAuth } from "./contexts/AuthContext"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function SignUp(){
  const { user, setUser } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    <div className="flex justify-center mt-40">
      <div className="border px-20 py-10 rounded-lg">
        <h1 className="text-center font-semibold text-5xl text-blue-300">Sign Up</h1>
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
                onClick={(event) => handleSignUp(event)} 
                className='border rounded-lg px-2 bg-blue-300 text-white font-medium'
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
            <button className="text-blue-500 font-medium">
                sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}