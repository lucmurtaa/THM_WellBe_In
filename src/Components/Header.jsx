import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoWellBein from '../assets/logo-wellbe-in.PNG'
import '../global.css'

const Header = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Fecha o menu mobile sempre que muda de rota
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img src={logoWellBein} alt="logo wellbe-in" className="logo-Wellbe-in" />
        </Link>

        <button
          className="nav__toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {open ? 'Fechar ↑' : 'Menu ↓'}
        </button>

        <ul className={`nav__links${open ? ' open' : ''}`}>
          <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Início</NavLink></li>
          <li><NavLink to="/problema" className={({ isActive }) => isActive ? 'active' : ''}>Problema</NavLink></li>
          <li><NavLink to="/solucao" className={({ isActive }) => isActive ? 'active' : ''}>Solução</NavLink></li>
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          <li><NavLink to="/sobre" className={({ isActive }) => isActive ? 'active' : ''}>Sobre</NavLink></li>
          <li className="nav__cta">
            <Link to="/dashboard">Testar agora</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
