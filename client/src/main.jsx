import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './router/AppRoutes.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
