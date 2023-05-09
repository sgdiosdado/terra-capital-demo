import { useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type User = { id: number; username: string }

type Auth = {
  user?: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<Auth>(null)

export const useAuth = () => {
  const {
    user,
    login: contextLogin,
    logout: contextLogout,
  } = useContext(AuthContext)

  const login = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'sergio', password: '12345' }),
        credentials: 'include',
      }).then(res => {
        if (!res.ok) throw new Error(`Some error ${res.body}`)
        return res
      })
      const data: { user: User } = await res.json()

      contextLogin(data.user)
    } catch (error) {
      console.log('Error in login...', error)
    }
  }

  const logout = () => {
    fetch('/api/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    }).then(res => {
      if (!res.ok) throw new Error(`Some error ${res.body}`)
      contextLogout()
    })
  }

  return { user, login, logout }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const login = (user: User) => {
    setUser(user)
    navigate('/pending', { replace: true })
  }

  const logout = () => {
    setUser(null)
    navigate('/login', { replace: true })
  }

  const fetchSession = () => {
    return fetch('/api/auth/who-am-i').then(res => {
      if (!res.ok) throw new Error('No session found')
      return res.json()
    })
  }

  useQuery<{ user?: User }>({
    queryKey: ['session'],
    queryFn: fetchSession,
    refetchInterval: 1000 * 5,
    enabled: !!user,
    retry: false,
    onError() {
      logout()
    },
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
