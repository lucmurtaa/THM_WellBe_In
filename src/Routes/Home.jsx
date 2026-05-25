import { Link } from 'react-router-dom'
import { Reveal } from '../Components/Reveal'
import { phaseCoverage, teamMembers, techStack } from '../content'
import '../global.css'

const Home = () => {
  return (
    <main>
      <section className="hero container">
        <div className="hero__grid">
          <span className="eyebrow hero__eyebrow">Challenge: FIAP × THM Estatística</span>
          <h1>A tecnologia <em className="italic">para o bem</em>.</h1>
          <p className="hero__lead">
            Wellbe-in transforma sua rotina digital em um Score de Equilíbrio claro. Identifica padrões individuais de desgaste
            antes que virem sintoma e devolve análises comportamentais personalizadas.
          </p>
          <div className="hero__cta">
            <Link to="/dashboard" className="btn btn--primary">
              Abrir o dashboard
              <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <a href="#video" className="btn btn--ghost">Assistir ao pitch</a>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div>
              <div className="stat__num"><span data-count="9" data-suffix="h">9h</span></div>
              <div className="stat__label">tempo médio diário em telas no Brasil</div>
            </div>
            <div>
              <div className="stat__num"><span data-count="68" data-suffix="%">68%</span></div>
              <div className="stat__label">relatam fadiga visual frequente</div>
            </div>
            <div>
              <div className="stat__num"><span data-count="2.3" data-suffix="x">2.3x</span></div>
              <div className="stat__label">risco de insônia com tela antes de dormir</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <span className="eyebrow">Como funciona</span>
          <h2>Três etapas. Uma rotina mais saudável.</h2>
          <p>O Wellbe-in não diagnostica. Ele observa, organiza e devolve sentido aos seus próprios hábitos digitais.</p>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature__num">01</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></svg>
            </div>
            <h3>Coleta diária leve</h3>
            <p>Um formulário simples e objetivo.</p>
          </div>

          <div className="feature">
            <span className="feature__num">02</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
            </div>
            <h3>Score de Equilíbrio</h3>
            <p>Cinco dimensões classificam o quão saudável foi seu dia digital.</p>
          </div>

          <div className="feature">
            <span className="feature__num">03</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            </div>
            <h3>Análise comportamental</h3>
            <p>Após 7 dias, o sistema transforma seus hábitos em análises personalizadas da sua rotina digital.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <span className="eyebrow">Para quem</span>
          <h2>Para quem vive <em className="italic">conectado</em>.</h2>
          <p>O Wellbe-in foi pensado para pessoas com alta exposição diária a telas — aqueles que mais precisam de uma lente para entender o próprio desgaste digital.</p>
        </div>

        <div className="audience-grid">
          <div className="audience">
            <div className="audience__icon">⌨</div>
            <h4>Programadores</h4>
            <p>Quem passa o dia depurando código e termina o dia desgastado.</p>
          </div>
          <div className="audience">
            <div className="audience__icon">🎓</div>
            <h4>Estudantes EAD</h4>
            <p>Aulas, materiais e provas no mesmo monitor usado para entretenimento.</p>
          </div>
          <div className="audience">
            <div className="audience__icon">🏠</div>
            <h4>Home office</h4>
            <p>Sem deslocamento físico, sem fronteiras claras entre trabalho e descanso.</p>
          </div>
          <div className="audience">
            <div className="audience__icon">🎮</div>
            <h4>Gamers</h4>
            <p>Sessões longas exigem recuperação consciente — sono, pausas e movimento.</p>
          </div>
        </div>
      </section>

      <section id="video" className="section container">
        <div className="section-header">
          <span className="eyebrow">Vídeo Pitch · 3 minutos</span>
          <h2>O projeto, em três minutos.</h2>
          <p>Apresentação completa do problema, da solução, do MVP e do impacto esperado.</p>
        </div>

        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src="https://www.youtube.com/embed/3SfwtWfnB24"
            title="Wellbe-in — Vídeo Pitch"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Link público: <a href="https://youtu.be/3SfwtWfnB24?si=zj4TKP4hf6ahhl18" style={{ color: 'var(--balance)' }}>https://youtu.be/3SfwtWfnB24?si=zj4TKP4hf6ahhl18</a>
        </p>
      </section>

      {/* ============================================================
          SOBRE O PROJETO — integrado na Home logo abaixo do pitch
          (página /sobre foi descontinuada)
          ============================================================ */}
      <section id="sobre-projeto" className="section container">
        <div className="section-header">
          <span className="eyebrow">Sobre o projeto</span>
          <h2>A equipe e a <em className="italic">stack</em>.</h2>
          <p>
            Wellbe-in foi construído por um grupo de estudantes do 1º ano de
            Engenharia de Software da FIAP, dentro do Challenge 2025-26 em
            parceria com a THM Estatística. Um sistema de monitoramento
            comportamental focado no equilíbrio entre tecnologia e bem-estar.
          </p>
        </div>
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

      <Reveal className="section container section--compact" style={{ textAlign: 'center' }}>
        <h2>Pronto para começar?</h2>
        <p style={{ margin: '1rem auto 0', maxWidth: '600px' }}>
          Abra o dashboard e registre seu primeiro dia. Em uma semana, o sistema já começa a identificar padrões.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn btn--primary">
            Ir para o dashboard
            <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/problema" className="btn btn--ghost">
            Conhecer o problema
          </Link>
        </div>
      </Reveal>

    </main>
  )
}

export default Home
