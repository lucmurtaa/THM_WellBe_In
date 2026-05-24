import React from 'react';
import { Reveal } from '../Components/Reveal';
import { crossInsights, solutionBands, solutionFlow, solutionPillars } from '../content';
import { Link } from 'react-router-dom';

export default function SolutionPage() {
  return (
    <main>
      <section className="page-hero container">
        <span className="eyebrow">Solução</span>
        <h1>Da rotina digital à <em className="italic">consciência comportamental</em>.</h1>
        <p>A WellBe-In analisa seus hábitos diários de forma segura e privada. Um registro rápido alimenta nossa lógica de análise para devolver insights claros sobre seu bem-estar — sem diagnósticos médicos, apenas autoconhecimento.</p>
      </section>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Arquitetura do Sistema</span><h2>Três pilares focados no seu equilíbrio.</h2><p>Seus dados protegidos e sincronizados.</p></div>
        <div className="pillars">{solutionPillars.map((pillar) => (<article className="pillar" key={pillar.num}><div className="pillar__num">{pillar.num}</div><h3>{pillar.title}</h3><p>{pillar.body}</p><ul className="pillar__list">{pillar.list.map((item) => (<li key={item}>{item}</li>))}</ul></article>))}</div>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Fluxo</span><h2>Do formulário ao insight, em quatro passos.</h2><p>O fluxo foi projetado para ser simples, curto e compreensível para o usuário desde a primeira interação.</p></div>
        <div className="flow">{solutionFlow.map((step) => (<article className="flow__step" key={step.num}><div className="flow__step__num">{step.num}</div><div className="flow__step__icon" aria-hidden="true">{step.icon}</div><h4>{step.title}</h4><p>{step.body}</p></article>))}</div>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Cruzamentos</span><h2>Os cinco cruzamentos comportamentais do MVP.</h2><p>Quando há histórico suficiente, o sistema encontra padrões recorrentes entre hábitos digitais e bem-estar.</p></div>
        <div className="crosses">{crossInsights.map((cross) => (<article className="cross" key={cross.num}><span className="cross__num">{cross.num}</span><h4>{cross.title}</h4><p>{cross.body}</p><div className="cross__quote">{cross.quote}</div></article>))}</div>
      </Reveal>

      <Reveal className="section container" style={{ textAlign: 'center' }}>
        <h2>Pronto para testar a solução?</h2>
        <p style={{ margin: '1rem auto 0' }}>Abra o painel e veja o score em tempo real.</p>
        <div style={{ marginTop: '2rem' }}><Link to="/dashboard" className="btn btn--primary">Abrir painel<svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></Link></div>
      </Reveal>
    </main>
  );
}