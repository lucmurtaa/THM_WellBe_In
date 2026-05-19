import React from 'react'
import '../global.css'
import { Link } from 'react-router-dom'



const Header = () => {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-mark"></span>
          HealthTrack<span>AI</span>
        </Link>
        <button className="nav__toggle" aria-label="Abrir menu">Menu ↓</button>
        <ul className="nav__links">
          <li><Link to="/home">Início</Link></li>
          <li><Link to="/problema">Problema</Link></li>
          <li><Link to="/solucao">Solução</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li className="nav__cta"><Link to="/dashboard">Testar agora</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
