import React from 'react';

const NAV_LINKS = [
  { to: '/index.html', label: 'Início' },
  { to: '/problema.html', label: 'Problema' },
  { to: '/solucao.html', label: 'Solução' },
  { to: '/dashboard.html', label: 'Dashboard' },
  { to: '/sobre.html', label: 'Sobre' }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="nav__logo" style={{ marginBottom: '1rem' }}>
              <span className="nav__logo-mark" />
              Wellbe<span>in</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '32ch' }}>
              A tecnologia para o bem. Um projeto acadêmico desenvolvido para o Challenge FIAP 2025-26 em parceria com a THM Estatística.
            </p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <a href={link.to}>{link.label}</a>
                </li>
              ))}
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
          <span>© <span data-year>{new Date().getFullYear()}</span> Wellbe-in · A tecnologia para o bem.</span>
          <span>Build 0.1.0 · React + Vite</span>
        </div>
      </div>
    </footer>
  );
}