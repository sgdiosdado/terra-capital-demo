import { ReactNode, createContext, useContext, useState } from 'react'

type Auth = {
  user?: { username: string }
  loggedIn: boolean
  setUser: (user: any) => void
  login: () => void
  logout: () => void
}

const AuthContext = createContext<Auth>(null)

export const useAuth = () => {
  const { user, loggedIn, login, logout } = useContext(AuthContext)

  return { user, loggedIn, login, logout }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState()

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login: () => setLoggedIn(true),
        logout: () => setLoggedIn(false),
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
