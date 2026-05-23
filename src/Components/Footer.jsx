import React from 'react'
import '../global.css'
import LogoWellBeIn from '../assets/logo-wellbe-in.PNG'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="nav__logo" style={{marginBottom: '1rem'}}>
              <img src={LogoWellBeIn} className='logo-Wellbe-in'/>
            </div>
            <p className='saude'>
              Projeto acadêmico desenvolvido para o Challenge FIAP 2026 em parceria com a THM Estatística.
            </p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul className='NavFooter'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/problema">Problema</Link></li>
              <li><Link to="/solucao">Solução</Link></li>
              <li><Link to="/dashboard">Painel</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer