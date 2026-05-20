import React from 'react';
import { Reveal } from '../components/Reveal';
import { crossInsights, solutionBands, solutionFlow, solutionPillars } from '../content';

export default function SolutionPage() {
  return (
    <main>
      <section className="page-hero container">
        <span className="eyebrow">Solução</span>
        <h1>Da rotina digital ao <em className="italic">insight comportamental</em>.</h1>
        <p>Wellbe-in é um sistema de monitoramento comportamental baseado nos seus hábitos digitais. Um formulário diário curto alimenta um motor de pontuação e um analisador comportamental — sem IA, sem diagnóstico médico, apenas lógica clara aplicada ao seu próprio histórico.</p>
      </section>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Arquitetura</span><h2>Três pilares, um único produto.</h2><p>O sistema opera no front-end. Toda a inteligência roda no navegador do usuário.</p></div>
        <div className="pillars">{solutionPillars.map((pillar) => (<article className="pillar" key={pillar.num}><div className="pillar__num">{pillar.num}</div><h3>{pillar.title}</h3><p>{pillar.body}</p><ul className="pillar__list">{pillar.list.map((item) => (<li key={item}>{item}</li>))}</ul></article>))}</div>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Fluxo</span><h2>Do formulário ao insight, em quatro passos.</h2><p>O fluxo foi projetado para ser simples, curto e compreensível para o usuário desde a primeira interação.</p></div>
        <div className="flow">{solutionFlow.map((step) => (<article className="flow__step" key={step.num}><div className="flow__step__num">{step.num}</div><div className="flow__step__icon" aria-hidden="true">{step.icon}</div><h4>{step.title}</h4><p>{step.body}</p></article>))}</div>
      </Reveal>

      <Reveal className="section container">
        <div className="model">
          <div className="model__head"><div><span className="eyebrow">Modelo de score</span><h3>Como os pontos são distribuídos.</h3><p>O score total vai de 0 a 100 e combina seis dimensões do dia digital.</p></div></div>
          <div className="model__weights">{[['Horas de tela', '25'], ['Pausas analógicas', '20'], ['Sobrecarga mental', '20'], ['Horas de sono', '15'], ['Qualidade do sono', '10'], ['Tela antes de dormir', '10']].map(([label, value]) => (<div className="weight-row" key={label}><span className="weight-row__label">{label}</span><div className="weight-row__bar"><div className="weight-row__bar-fill" style={{ width: `${Number(value) * 4}%` }} /></div><span className="weight-row__val">{value}</span></div>))}</div>
        </div>
        <div className="scale">{solutionBands.map((band, index) => (<article className={`scale__item ${index === 1 ? 'scale__item--warn' : ''} ${index === 2 ? 'scale__item--mod' : ''} ${index === 3 ? 'scale__item--bad' : ''}`.trim()} key={band.range}><div className="scale__range">{band.range}</div><div className="scale__label">{band.title}</div><p className="scale__desc">{band.body}</p></article>))}</div>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Cruzamentos</span><h2>Os cinco cruzamentos comportamentais do MVP.</h2><p>Quando há histórico suficiente, o sistema encontra padrões recorrentes entre hábitos digitais e bem-estar.</p></div>
        <div className="crosses">{crossInsights.map((cross) => (<article className="cross" key={cross.num}><span className="cross__num">{cross.num}</span><h4>{cross.title}</h4><p>{cross.body}</p><div className="cross__quote">{cross.quote}</div></article>))}</div>
      </Reveal>

      <Reveal className="section container" style={{ textAlign: 'center' }}>
        <h2>Pronto para testar a solução?</h2>
        <p style={{ margin: '1rem auto 0' }}>Abra o dashboard e veja o score em tempo real.</p>
        <div style={{ marginTop: '2rem' }}><a href="/dashboard.html" className="btn btn--primary">Abrir o dashboard<svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></a></div>
      </Reveal>
    </main>
  );
}