import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './mvp/presenters/AuthContext.jsx'
import { ThemeProvider } from './mvp/presenters/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <ThemeProvider>
    <AuthProvider>
       <App />
    </AuthProvider>
  </ThemeProvider>
  </BrowserRouter> 
  </StrictMode>,
)
