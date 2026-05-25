import React from 'react'
import { Link } from 'react-router-dom'

const Erro = () => {
  return (
    <main>
      <section className="page-hero container" style={{ textAlign: 'center', alignItems: 'center' }}>
        <span className="eyebrow">Erro 404</span>
        <h1>Esta página <em className="italic">não existe</em>.</h1>
        <p style={{ margin: '0 auto 2rem' }}>
          A rota que você tentou acessar não foi encontrada. Volte para o início
          ou navegue pelo menu acima.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--primary">
            Voltar ao início
            <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/dashboard" className="btn btn--ghost">
            Ir para o dashboard
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Erro
