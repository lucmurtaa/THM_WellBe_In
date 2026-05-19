import React from 'react';
import { Reveal } from '../components/Reveal';
import { problemCards, problemImpacts } from '../content';

export default function Problema() {
  return (
    <main>
      <section className="page-hero container">
        <span className="eyebrow">Diagnóstico</span>
        <h1>O desgaste se acumula no <em className="italic">silêncio</em> dos cliques.</h1>
        <p>Fadiga visual, tensão cervical, sono fragmentado, sobrecarga mental — sinais que a rotina digital intensa imprime no corpo e na mente, e que costumam ser ignorados até virarem sintoma persistente.</p>
      </section>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Por que isso importa</span><h2>Vivemos mais conectados que nunca — e mais cansados que nunca.</h2><p>Programadores, estudantes EAD, gamers e profissionais em home office passam a maior parte do dia em frente a telas. O custo invisível desse padrão raramente é observado de forma estruturada.</p></div>
        <div className="ctx-grid">
          {problemCards.map((card) => (<article className="ctx-card" key={card.title}><div className="ctx-card__num">{card.value}<small>{card.suffix}</small></div><h3>{card.title}</h3><p>{card.body}</p><div className="ctx-card__src">{card.source}</div></article>))}
        </div>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">A lacuna</span><h2>Sinais existem. Falta uma lente para enxergá-los.</h2><p>O corpo dá avisos discretos antes de o cansaço virar sintoma. Mas sem registro, sem comparação histórica e sem análise comportamental, esses sinais simplesmente se perdem.</p></div>
        <ul className="impact-list">
          {problemImpacts.map((item) => (<li className="impact-item" key={item.title}><div className="impact-item__icon" aria-hidden="true">{item.icon}</div><div><h4>{item.title}</h4><p>{item.body}</p></div></li>))}
        </ul>
        <blockquote className="quote">"O desafio do nosso tempo não é coletar mais dados sobre o uso de telas — é transformá-los em consciência, e consciência em pequenas mudanças sustentáveis."<cite>— Premissa do projeto Wellbe-in</cite></blockquote>
      </Reveal>

      <Reveal className="section container" style={{ textAlign: 'center' }}>
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto' }}><h2>Esse é o problema. <em className="italic">Veja a solução.</em></h2></div>
        <div style={{ marginTop: '2rem' }}><a href="/solucao.html" className="btn btn--primary">Conhecer a solução<svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></a></div>
      </Reveal>
    </main>
  );
}