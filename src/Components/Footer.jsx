import React from 'react'
import '../global.css'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="nav__logo" style={{marginBottom: '1rem'}}>
              <span className="nav__logo-mark"></span>
              HealthTrack<span>AI</span>
            </div>
            <p className='saude'>
              Saúde inteligente e conectada. Um projeto acadêmico desenvolvido para o Challenge FIAP 2025-26 em parceria com a THM Estatística.
            </p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/problema">Problema</Link></li>
              <li><Link to="/solucao">Solução</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
            </ul>
          </div>
          <div>
            <h4>Parceria</h4>
            <ul>
              <li>FIAP — Engenharia de Software</li>
              <li>THM Estatística</li>
              <li>Challenge 2025-26</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© <span data-year>2026</span> HealthTrack AI · Projeto acadêmico</span>
          <span>Build 0.1.0 · Static deploy</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer