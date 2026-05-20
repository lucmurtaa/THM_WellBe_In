import React from 'react'
import '../global.css'
import logoWellBein from '../assets/logo-wellbe-in.PNG'
import { Link } from 'react-router-dom'



const Header = () => {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img src={logoWellBein} alt="logo wellbe-in" className='logo-Wellbe-in'/>
        </Link>
        <label className="nav__toggle" aria-label="Abrir menu" htmlFor='toggle__input'>Menu ↓</label>
        <input id='toggle__input' type="checkbox" hidden className='toggle__input'/>
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
