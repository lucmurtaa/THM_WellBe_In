import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
import Header from "./Components/Header.jsx"

import Home from "./Routes/Home.jsx"
import Auth from "./Routes/Auth.jsx"
import Erro from "./Routes/Erro"
import Footer from "./Components/Footer.jsx"
import Problema from "./Routes/Problema.jsx"
import Solucao from "./Routes/Solucao.jsx"
import Dashboard from "./Routes/Dashboard.jsx"
import Sobre from "./Routes/Sobre.jsx"

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => el.classList.add('in-view'))
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Erro />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/problema" element={<Problema />} />
            <Route path="/solucao" element={<Solucao />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}
