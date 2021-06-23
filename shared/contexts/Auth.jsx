import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

const AuthContext = createContext({
  isSigned: false,
  signInUrl: '/api/auth/login',
  data: {},
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const signInUrl = '/api/auth/login'
  const [data, setData] = useState({})

  useEffect(() => {
    const cookies = new Cookies()
    const username = cookies.get('username')
    if (username) {
      setData({ username })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!data?.username,
        signInUrl,
        data,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
