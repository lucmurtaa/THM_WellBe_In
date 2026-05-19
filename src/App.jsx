import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Problema from './pages/Problema';
import Solucao from './pages/Solucao';
import Dashboard from './pages/Dashboard';
import Sobre from './pages/Sobre';
import './styles/global.css';



const TITLE_MAP = {
  '/': 'Wellbe-in — A tecnologia para o bem.',
  '/index.html': 'Wellbe-in — A tecnologia para o bem.',
  '/problema.html': 'O Problema — Wellbe-in',
  '/solucao.html': 'Solução — Wellbe-in',
  '/dashboard.html': 'Dashboard — Wellbe-in',
  '/sobre.html': 'Sobre o projeto — Wellbe-in'
};

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    document.title = TITLE_MAP[location.pathname] ?? TITLE_MAP['/'];
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/problema.html" element={<Problema />} />
          <Route path="/solucao.html" element={<Solucao />} />
          <Route path="/dashboard.html" element={<Dashboard />} />
          <Route path="/sobre.html" element={<Sobre />} />
          <Route path="*" element={<Navigate to="/index.html" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}