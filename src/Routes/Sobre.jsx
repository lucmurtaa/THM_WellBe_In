import React from "react";
import { Reveal } from "../Components/Reveal";
import { phaseCoverage, teamMembers, techStack } from "../content";
import { Link } from 'react-router-dom';

export default function Sobre() {
  return (
    <main>
      <section className="page-hero container">
        <span className="eyebrow">Sobre o projeto</span>
        <h1>
          A equipe e a <em className="italic">stack</em>.
        </h1>
        <p>
          Wellbe-in foi construído por um grupo de estudantes do 1º ano de
          Engenharia de Software da FIAP, dentro do Challenge 2025-26 em
          parceria com a THM Estatística. Um sistema de monitoramento
          comportamental focado no equilíbrio entre tecnologia e bem-estar.
        </p>
      </section>

      <Reveal className="section container section--compact">
        <div className="section-header">
          <span className="eyebrow">Integrantes</span>
          <h2>Quem fez acontecer.</h2>
          <p>
            Cinco estudantes, cinco frentes de trabalho. Cada integrante da
            equipe assumiu uma área específica do projeto, do design ao deploy.
          </p>
        </div>
        <div className="team">
          {teamMembers.map((member) => (
            <article className="member" key={member.name}>
              <div className="member__avatar">
                <span className="member__initials">{member.initials}</span>
              </div>
              <div className="member__name">{member.name}</div>
              <div className="member__role">{member.role}</div>
              <span className="member__rm">{member.rm}</span>
              <p className="member__desc">{member.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section container section--compact">
        <div className="section-header">
          <span className="eyebrow">Tecnologias</span>
          <h2>O que foi usado, e o porquê.</h2>
          <p>
            Toda a stack foi escolhida dentro do escopo do que foi ensinado até
            a Fase 7 do curso, mantendo o projeto totalmente estático e
            deployável em qualquer provedor.
          </p>
        </div>
        <div className="tech-grid">
          {techStack.map((tech) => (
            <article className="tech" key={tech.title}>
              <div className="tech__icon">{tech.icon}</div>
              <div className="tech__info">
                <strong>{tech.title}</strong>
                <span>{tech.body}</span>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section container section--compact">
        <div className="section-header">
          <span className="eyebrow">Conexão com o curso</span>
          <h2>Como cada fase do curso aparece no projeto.</h2>
          <p>
            Mapeamento direto entre o conteúdo ensinado nas fases 1 a 7 e os
            componentes do Wellbe-in.
          </p>
        </div>
        <ul className="phase-list">
          {phaseCoverage.map((phase) => (
            <li key={phase.title}>
              <div>
                <strong>{phase.title}</strong>
                <span>{phase.body}</span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        className="section container section--compact"
        style={{ textAlign: "center" }}
      >
        <h2>
          Volte para o <em className="italic">início</em>.
        </h2>
        <div style={{ marginTop: "2rem" }}>
          <Link to="/"
            className="btn btn--ghost"
          >
            <svg
              className="btn__arrow"
              style={{ transform: "rotate(180deg)" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            Página inicial
          </Link>
          <Link
            to="/dashboard"
            className="btn btn--primary"
            style={{ marginLeft: "0.5rem" }}
          >
            Ir para o dashboard
            <svg
              className="btn__arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
