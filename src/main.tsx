import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider, ProtectedRoute } from './Provider/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ProtectedRoute>
    <App />
    </ProtectedRoute>
  </AuthProvider>
)

// Deliberate lint errors to demonstrate that CI blocks a bad change
const unusedDemo: any = 1
