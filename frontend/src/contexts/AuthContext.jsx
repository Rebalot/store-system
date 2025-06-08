import { createContext, useContext, useState, useEffect } from "react"
import { API_ENDPOINTS } from "../utils/config"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggingIn, setLoggingIn] = useState(false)
  const [isLoggingOut, setLoggingOut] = useState(false)
  const [isRegistering, setRegistering] = useState(false)
  const isLoading = isLoggingIn || isLoggingOut || isRegistering
  const [error, setError] = useState(null)

  const loadUser = async () => {
    try {
      console.log('Fetching user data from AuthContext...')
      const res = await fetch(API_ENDPOINTS.AUTH.ME, {
        credentials: 'include',
      })

      if (!res.ok) {
        setUser(null)
        return null
      } 
      const data = await res.json()
      console.log('User data AuthContext:', data)
      setUser(data)
      return data
    } catch {
      setUser(null)
      return null
    }
  }
  useEffect(() => {
    loadUser()
    }, [])
  
  const login = async (email, password) => {
    setLoggingIn(true)
    setError(null)
    
    try {
      const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        throw new Error('Invalid credentials')
      }
  
      const user = await loadUser()
      if (!user) {
        throw new Error('Failed to load user data after login')
      }
      return true
      } catch (err) {
        console.error('Login error:', err)
        setError(err.message || 'An error occurred during login')
        return false
      } finally {
        setLoggingIn(false)
      }
    }
  
    const logout = async () => {
      setLoggingOut(true)
      setError(null)
      
      try {
        const res = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        credentials: 'include',
        })
        if (!res.ok) {
          throw new Error('Logout failed')
        }
        setUser(null)
        return true
      } catch (err) {
        console.error('Logout error:', err)
        setError(err.message || 'Failed to log out. Please try again.')
        return false
      } finally {
        setLoggingOut(false)
      }
    }

  const register = async (firstName, lastName, email, password, phone = "") => {
    setRegistering(true)
    setError(null)
    const payload = {
    firstName,
    lastName,
    email,
    password,
    ...(phone && { phone })
    };
    try {
      console.log('REGISTER endpoint:', API_ENDPOINTS.AUTH.REGISTER);
      const res = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        })
      if (!res.ok) {
        throw new Error('Registration failed')
      }
      const user = await loadUser()
      if (!user) {
        throw new Error('Failed to load user data after registration')
      }
      return true
    } catch (err) {
      console.error("Registration error:", err)
      setError(err.message || "An error occurred during registration")
      return false
    } finally {
      setRegistering(false)
    }
  }

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
