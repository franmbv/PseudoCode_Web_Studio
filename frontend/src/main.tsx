import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ExerciseProvider } from './context/ExerciseContext' 
import { AuthProvider } from './context/AuthContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ExerciseProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ExerciseProvider>
    </BrowserRouter>
  </StrictMode>,
)
