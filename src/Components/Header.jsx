import '../global.css'
import logoWellBein from '../assets/logo-wellbe-in.PNG'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

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
          {user && <li><Link to="/dashboard">Painel</Link></li>}
          <li><Link to="/sobre">Sobre</Link></li>
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
