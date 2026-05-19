import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/index.html', label: 'Início' },
  { to: '/problema.html', label: 'Problema' },
  { to: '/solucao.html', label: 'Solução' },
  { to: '/dashboard.html', label: 'Dashboard' },
  { to: '/sobre.html', label: 'Sobre' }
];

function Logo() {
  return (
    <a href="/index.html" className="nav__logo">
      <span className="nav__logo-mark" />
      Wellbe<span>in</span>
    </a>
  );
}

export default function Header() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <Logo />
        <button
          className="nav__toggle"
          type="button"
          aria-label="Abrir menu"
          onClick={() => {
            const links = document.querySelector('.nav__links');
            const toggle = document.querySelector('.nav__toggle');
            if (!links || !toggle) return;
            links.classList.toggle('open');
            toggle.textContent = links.classList.contains('open') ? '× Fechar' : 'Menu ↓';
          }}
        >
          Menu ↓
        </button>
        <ul className="nav__links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="nav__cta">
            <NavLink to="/dashboard.html">Testar agora</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}