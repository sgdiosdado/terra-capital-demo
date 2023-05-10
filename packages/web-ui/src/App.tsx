import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './shared/main-layout'
import { Dashboard } from './dashboard/page'
import { Pending } from './accounting/pending-list'
import { Login } from './auth/login'
import { AuthProvider } from './auth/auth-context'
import { ProtectedRoute } from './auth/protected-route'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    index: false,
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        index: false,
        element: (
          <ProtectedRoute>
            <MainLayout><Outlet /></MainLayout>
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
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
