import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import AppLayout from './ui/AppLayout'
import LoginForm from './features/authenticaton/LoginForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthGuard from './features/authenticaton/AuthGuard'

import MembersTable from './pages/MembersTable'
import Admin from './pages/Admin'
import AdminLoginForm from './features/authenticaton/AdminLoginForm'
import AdminAuthGuard from './features/authenticaton/AdminAuthGuard'
import AdminHome from './pages/AdminHome'
import VerificationForm from './features/member/VerificationForm'
import AdminStations from './features/station/AdminStations'
import FormAddStation from './features/authenticaton/FormAddStation'
import FormMRN from './features/mrn/FormMRN'
import MRNs from './features/mrn/MRNs'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Always refetch data
      refetchOnWindowFocus: true,
    },
  },
})

// App.tsx (router section)
const router = createBrowserRouter([
  // PUBLIC / KIOSK ROUTE
  {
    path: '/mrn-generator',
    element: <FormMRN />, // not wrapped by AuthGuard
  },

  // AUTH-GUARDED APP
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      // keep these as you had them
      {
        path: '/mrns',
        element: <MRNs />,
      },
      { path: '/', element: <Navigate to='home' /> },
      { path: 'home', element: <Home /> },
      { path: 'verification', element: <VerificationForm /> },
    ],
  },

  // PUBLIC (unchanged)
  { path: 'members', element: <MembersTable /> },
  { path: 'login', element: <LoginForm /> },
  { path: 'secret-001/admin-login', element: <AdminLoginForm /> },

  // ADMIN (unchanged)
  {
    path: 'admin-home',
    element: (
      <AdminAuthGuard>
        <AdminHome />
      </AdminAuthGuard>
    ),
  },
  {
    path: 'secret-001/admin-stations',
    element: (
      <AdminAuthGuard>
        <AdminStations />
      </AdminAuthGuard>
    ),
  },
  {
    path: 'secret-001/file-generator',
    element: (
      <AdminAuthGuard>
        <FormMRN />
      </AdminAuthGuard>
    ),
  },
  {
    path: 'secret-001/signup',
    element: (
      <AdminAuthGuard>
        <FormAddStation />
      </AdminAuthGuard>
    ),
  },
  {
    path: 'secret-001/admin-members',
    element: (
      <AdminAuthGuard>
        <Admin />
      </AdminAuthGuard>
    ),
  },
  {
    path: 'secret-001/admin-files',
    element: (
      <AdminAuthGuard>
        <MRNs />
      </AdminAuthGuard>
    ),
  },

  { path: '*', element: <PageNotFound /> },
])

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '12px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'white',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
