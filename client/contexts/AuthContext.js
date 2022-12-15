import { useContext, useState, createContext, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [shoppingCart, setShoppingCart] = useLocalStorage("shopping-cart", []);

  const SignOut = () => {
    sessionStorage.removeItem('jwt')
    setUser(null)
  }

  useEffect(() => {
    const getSession = async () => {
      let token = sessionStorage.getItem('jwt')
      if (!token || token === ''){
        return
      }
      const response = await fetch(`${SERVER_URL}/v1/auth/verify-token`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })
      if (!response.ok) return
      const data = await response.json()
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
            shoppingCart,
            setShoppingCart
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider