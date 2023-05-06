import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './shared/main-layout'
import { Dashboard } from './dashboard/page'
import { Pending } from './accounting/pending-list'
import { Login } from './auth/login'
import { AuthProvider } from './auth/auth-context'
import { ProtectedRoute } from './auth/protected-route'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    index: false,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'pending',
        element: <Pending />,
      },
    ],
  },
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
