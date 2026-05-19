import React from 'react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Reveal } from '../components/Reveal';
import { homeAudience, homeFeatures } from '../content';

export default function Home() {
  return (
    <main>
      <section className="hero container">
        <div className="hero__grid">
          <div className="hero__copy">
            <span className="eyebrow hero__eyebrow">FIAP × THM Estatística · Challenge 2025-26</span>
            <h1>A tecnologia, finalmente, <em className="italic">para o bem</em>.</h1>
            <p className="hero__lead">Wellbe-in transforma sua rotina digital — telas, pausas, sono, sobrecarga mental — em um Score de Equilíbrio claro. Identifica padrões individuais de desgaste antes que virem sintoma e devolve análises comportamentais personalizadas.</p>
            <div className="hero__cta">
              <a href="/dashboard.html" className="btn btn--primary">
                Abrir o dashboard
                <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
              <a href="/index.html#video" className="btn btn--ghost">Assistir ao pitch</a>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="orbit"><div className="orbit__node" /></div>
            <div className="orbit orbit--mid"><div className="orbit__node" /></div>
            <div className="orbit orbit--inner"><div className="orbit__node" /></div>
            <div className="hero__core"><div className="hero__pulse">Equilíbrio<strong>82</strong>de 100</div></div>
            <div className="hero__floating-card hero__floating-card--1"><div className="fc-icon fc-icon--green">◐</div><div className="fc-text"><strong>Sono saudável</strong><span>7.8h · qualidade boa</span></div></div>
            <div className="hero__floating-card hero__floating-card--2"><div className="fc-icon fc-icon--amber">⌨</div><div className="fc-text"><strong>Tela: 7h hoje</strong><span>Sugestão: pausa real</span></div></div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div><div className="stat__num"><AnimatedCounter value={9.3} suffix="h" /></div><div className="stat__label">tempo médio diário em telas no Brasil</div></div>
            <div><div className="stat__num"><AnimatedCounter value={68} suffix="%" /></div><div className="stat__label">relatam fadiga visual frequente</div></div>
            <div><div className="stat__num"><AnimatedCounter value={2.3} suffix="x" /></div><div className="stat__label">risco de insônia com tela antes de dormir</div></div>
            <div><div className="stat__num"><AnimatedCounter value={5} /></div><div className="stat__label">cruzamentos comportamentais no MVP</div></div>
          </div>
        </div>
      </section>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Como funciona</span><h2>Três etapas. Uma rotina mais saudável.</h2><p>O Wellbe-in não diagnostica. Ele observa, organiza e devolve sentido aos seus próprios hábitos digitais.</p></div>
        <div className="features">
          {homeFeatures.map((feature) => (
            <article className="feature" key={feature.num}><span className="feature__num">{feature.num}</span><div className="feature__icon" aria-hidden="true">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.body}</p></article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section container">
        <div className="section-header"><span className="eyebrow">Para quem</span><h2>Para quem vive <em className="italic">conectado</em>.</h2><p>O Wellbe-in foi pensado para pessoas com alta exposição diária a telas — aquelas que mais precisam de uma lente para entender o próprio desgaste digital.</p></div>
        <div className="audience-grid">
          {homeAudience.map((audience) => (
            <article className="audience" key={audience.title}><div className="audience__icon" aria-hidden="true">{audience.icon}</div><h4>{audience.title}</h4><p>{audience.body}</p></article>
          ))}
        </div>
      </Reveal>

      <Reveal id="video" className="section container">
        <div className="section-header"><span className="eyebrow">Vídeo Pitch · 3 minutos</span><h2>O projeto, em três minutos.</h2><p>Apresentação completa do problema, da solução, do MVP e do impacto esperado.</p></div>
        <div className="home-video"><iframe src="https://www.youtube.com/embed/MDea45GRuwk" title="Wellbe-in — Vídeo Pitch" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
        <p className="inline-note">Link público: <a href="https://youtu.be/MDea45GRuwk">https://youtu.be/MDea45GRuwk</a>&nbsp;·&nbsp; Substitua pelo link real do vídeo da equipe.</p>
      </Reveal>

      <Reveal id="sobre-projeto" className="section container">
        <div className="section-header"><span className="eyebrow">Sobre o projeto</span><h2>Conheça a equipe e a stack.</h2><p>Wellbe-in é um produto desenvolvido como parte do Challenge FIAP × THM Estatística por estudantes de Engenharia de Software.</p></div>
        <a href="/sobre.html" className="btn btn--ghost">Ver equipe e tecnologias completas<svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></a>
      </Reveal>
    </main>
  );
}