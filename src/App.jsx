import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'

import Home from './Routes/Home.jsx'
import Problema from './Routes/Problema.jsx'
import Solucao from './Routes/Solucao.jsx'
import Dashboard from './Routes/Dashboard.jsx'
import Sobre from './Routes/Sobre.jsx'
import Erro from './Routes/Erro.jsx'

// Garante que ao trocar de rota a página suba para o topo automaticamente
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/problema" element={<Problema />} />
        <Route path="/solucao" element={<Solucao />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<Erro />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
