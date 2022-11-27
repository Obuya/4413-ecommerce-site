import { useContext, useState, createContext, useEffect } from "react"

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState()
	const [loading, setLoading] = useState(false)

  const SignOut = () => {
    setUser(null)
  }

	useEffect(() => {
		// TODO: if active session with JWT fetch the user and automatically set the user
		const getSession = async () => {
			const response = await fetch('')

			if (response.ok){}
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