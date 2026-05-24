import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logoWellBein from '../assets/logo-wellbe-in.PNG'
import '../global.css'

const Header = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

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
          {user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Painel</NavLink></li>}
          <li><NavLink to="/sobre" className={({ isActive }) => isActive ? 'active' : ''}>Sobre</NavLink></li>
          {user ? (
            <>
              <li className="nav__user"><span>{profile?.username || user.email}</span></li>
              <li className="nav__cta"><button className="nav__logout-btn" onClick={handleLogout}>Sair</button></li>
            </>
          ) : (
            <li className="nav__cta"><Link to="/auth">Entrar</Link></li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
