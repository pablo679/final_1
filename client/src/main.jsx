
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // 1. Importamos el Router

import './style.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 2. Envolvemos toda la App con él */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)