import React from 'react'
import { Link } from 'react-router-dom'
import LogoWellBeIn from '../assets/logo-wellbe-in.PNG'
import '../global.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="nav__logo" style={{ marginBottom: '1rem' }}>
              <img src={LogoWellBeIn} alt="logo wellbe-in" className="logo-Wellbe-in" />
            </div>
            <p className="saude">
              Projeto acadêmico desenvolvido para o Challenge FIAP 2026 em parceria com a THM Estatística.
            </p>
          </div>

          <div className="footer__col">
            <h4>Navegação</h4>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/problema">Problema</Link></li>
              <li><Link to="/solucao">Solução</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Projeto</h4>
            <ul>
              <li><a href="#video">Vídeo pitch</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">Repositório</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Wellbe-in · A tecnologia para o bem.</span>
          <span>FIAP × THM · Challenge 2025-26</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
