import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useAuth } from "./contexts/AuthContext"

export default function SignUp(){
  const { user, setUser } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  useEffect(() => {
    // TODO redirect if user already signed in 
    //if (user) router.push('/')
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
      const response = await fetch('', {
        method: 'POST',
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
      setUser(data)
    } catch (error){
      console.log(error)
      setErrorMessage('')
    }
  }

  return (
    <div className="flex justify-center">
      <div>
        <form>
            <div className='flex flex-col p-5'>
            <input 
              placeholder='username' 
              className='border' 
              onChange={(event) => setUsername(event.target.value)}
              type={"text"}
              maxLength={50}
            />
            <input 
              placeholder='password' 
              className='border' 
              onChange={(event) => setPassword(event.target.value)}
              type={"password"}
              maxLength={120}
            />
            <button onClick={(event) => handleSignUp(event)} className='border'>sign up</button>
            </div>
            {errorMessage && (
              <div className="font-medium text-red-500 text-center">
                  {errorMessage}
              </div>
            )}
        </form>
        <div className="px-5 text-center">
          If already a user {' '}
          <Link href={'/signin'}>
            <button className="text-blue-500 font-medium">
                sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}