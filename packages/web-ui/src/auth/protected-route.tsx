import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth-context'

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace/>

  return children
}
