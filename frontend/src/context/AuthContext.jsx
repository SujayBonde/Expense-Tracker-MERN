import { createContext, useState, useEffect } from 'react'
import authService from './authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'))
    setUser(userFromStorage)
  }, [])

  const register = async (userData) => {
    setIsLoading(true)
    try {
      const data = await authService.register(userData)
      setUser(data)
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      )
    }
    setIsLoading(false)
  }

  const login = async (userData) => {
    setIsLoading(true)
    try {
      const data = await authService.login(userData)
      setUser(data)
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      )
    }
    setIsLoading(false)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const reset = () => {
    setIsError(false)
    setIsSuccess(false)
    setIsLoading(false)
    setMessage('')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isError,
        isSuccess,
        message,
        register,
        login,
        logout,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
