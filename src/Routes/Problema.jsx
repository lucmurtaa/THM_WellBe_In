import React from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../Components/Reveal'
import { problemCards, problemImpacts } from '../content'

const Problema = () => {
  return (
    <main>
      <section className="page-hero container">
        <span className="eyebrow">Diagnóstico</span>
        <h1>O cansaço digital se acumula <em className="italic">em silêncio</em>.</h1>
        <p>
          Olhos ardendo, sono ruim, irritabilidade, sensação de "cabeça pesada" no fim do dia.
          São sinais que aparecem aos poucos, são normalizados e, sem ninguém medir,
          viram a rotina. O Wellbe-in nasceu para tornar visível esse desgaste antes que ele
          vire um sintoma instalado.
        </p>
      </section>

      <Reveal className="section container">
        <div className="section-header">
          <span className="eyebrow">Por que isso importa</span>
          <h2>O peso real de uma rotina hiperconectada.</h2>
          <p>
            A exposição a telas explodiu na última década, mas a percepção individual sobre
            o impacto disso continua subdimensionada. Os números abaixo mostram o tamanho
            do problema que o sistema ajuda a enxergar.
          </p>
        </div>

        <div className="ctx-grid">
          {problemCards.map((card) => (
            <article className="ctx-card" key={card.title}>
              <div className="ctx-card__num">
                {card.value}<small>{card.suffix}</small>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="ctx-card__src">{card.source}</div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header">
          <span className="eyebrow">A lacuna</span>
          <h2>Você gera dados todos os dias. Ninguém os lê com você.</h2>
          <p>
            Smartwatches, apps de bem-estar e planilhas pessoais até existem — mas falta
            uma camada que conecte os pontos e devolva sentido prático ao que está
            acontecendo com a sua rotina.
          </p>
        </div>

        <ul className="impact-list">
          {problemImpacts.map((item) => (
            <li className="impact-item" key={item.title}>
              <div className="impact-item__icon" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto' }}>
          <h2>Esse é o problema. <em className="italic">Veja a solução.</em></h2>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/solucao" className="btn btn--primary">
            Conhecer a solução
            <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </main>
  )
}

export default Problema
