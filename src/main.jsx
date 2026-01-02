import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import Dashboard from './Dashboard.jsx'
import {ToastContainer,Bounce} from "react-toastify"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
    <ToastContainer position="bottom-right" autoClose={3000} transition={Bounce}/>
  </StrictMode>,
)
