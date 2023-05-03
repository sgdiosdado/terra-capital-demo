import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './shared/main-layout';
import { Dashboard } from './dashboard/page';
import { Pending } from './accounting/pending-list';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <h1>Login</h1>,
  },
  {
    path: '/',
    index: false,
    element: <MainLayout />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
