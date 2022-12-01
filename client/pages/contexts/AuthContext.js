import { useContext, useState, createContext, useEffect } from "react"
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  const SignOut = () => {
    setUser(null)
  }

  useEffect(() => {
    // TODO: if active session with JWT fetch the user and automatically set the user
    const getSession = async () => {
      let token = sessionStorage.getItem('jwt')
      if (!token || token === ''){
        return
      }
      const response = await fetch(`${SERVER_URL}/v1/auth/verify-token`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) return
      const data = await response.json()
      console.log(data)
      sessionStorage.setItem('jwt', data.token)
      setUser(data.user)
    }
    getSession()
  }, [])

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            SignOut,
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider