import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth-context'

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const { loggedIn } = useAuth()

  if (!loggedIn) return <Navigate to="/login" replace/>

  return children
}
