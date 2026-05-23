import React from "react";
import { Link } from "react-router-dom";
import "../global.css";

const Home = () => {
  return (
    <main>
      <section className="hero container">
        <div className="hero__grid">
          <span className="eyebrow hero__eyebrow">
            Challenge: FIAP × THM Estatística
          </span>
          <h1>
            A tecnologia <em className="italic">para o bem</em>.
          </h1>
          <p className="hero__lead">
            A WellBe-In analisa seus hábitos digitais para antecipar sinais de
            desgaste e fadiga. Compreenda seus padrões de uso e recupere o
            controle da sua saúde e bem-estar.
          </p>
          <div className="hero__cta">
            <Link to="/dashboard" className="btn btn--primary">
              Ver meu painel
              <svg
                className="btn__arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="#video" className="btn btn--ghost">
              Assistir ao pitch
            </a>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div>
              <div className="stat__num">
                <span data-count="9" data-suffix="h">
                  9h
                </span>
              </div>
              <div className="stat__label">
                tempo médio diário em telas no Brasil
              </div>
            </div>
            <div>
              <div className="stat__num">
                <span data-count="68" data-suffix="%">
                  68%
                </span>
              </div>
              <div className="stat__label">relatam fadiga visual frequente</div>
            </div>
            <div>
              <div className="stat__num">
                <span data-count="2.3" data-suffix="x">
                  2.3x
                </span>
              </div>
              <div className="stat__label">
                risco de insônia com tela antes de dormir
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <span className="eyebrow">Como funciona</span>
          <h2>Três etapas. Uma rotina digital mais saudável.</h2>
          <p>
            A WellBe-In não realiza diagnósticos clínicos. Ela monitora,
            organiza e devolve a consciência sobre os seus próprios hábitos
            digitais.
          </p>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature__num">01</span>
            <div className="feature__icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                <path d="M9 11V7a3 3 0 0 1 6 0v4" />
              </svg>
            </div>
            <h3>Coleta diária leve</h3>
            <p>Um formulário simples e objetivo.</p>
          </div>

          <div className="feature">
            <span className="feature__num">02</span>
            <div className="feature__icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h3>Índice de Bem-Estar</h3>
            <p>
              Cinco dimensões comportamentais avaliam o equilíbrio da sua rotina
              digital.
            </p>
          </div>

          <div className="feature">
            <span className="feature__num">03</span>
            <div className="feature__icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3>Análise comportamental</h3>
            <p>
              Após 7 dias, o sistema mapeia seus padrões e gera orientações
              personalizadas para prevenir o desgaste.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <span className="eyebrow">Para quem</span>
          <h2>
            Para quem vive <em className="italic">conectado</em>.
          </h2>
          <p>
            O Wellbe-in foi pensado para pessoas com alta exposição diária a
            telas — aqueles que mais precisam de uma lente para entender o
            próprio desgaste digital.
          </p>
        </div>

        <div className="audience__container">
          <div className="audience">
            <div className="audience__icon">⌨</div>
            <h4>Programadores</h4>
            <p>
              Horas seguidas de código que exigem atenção à fadiga mental e
              visual ao fim do dia.
            </p>
          </div>
          <div className="audience">
            <div className="audience__icon">🎓</div>
            <h4>Estudantes EAD</h4>
            <p>
              Aulas, leituras e lazer concentrados na mesma tela, sem separação
              de ambiente.
            </p>
          </div>
          <div className="audience">
            <div className="audience__icon">🏠</div>
            <h4>Home office</h4>
            <p>
              Profissionais que precisam estabelecer limites claros entre o
              trabalho e o descanso.
            </p>
          </div>
          <div className="audience">
            <div className="audience__icon">🎮</div>
            <h4>Gamers</h4>
            <p>
              Sessões longas de foco que demandam recuperação consciente do sono
              e pausas.
            </p>
          </div>
        </div>
      </section>

      <section id="video" className="section container">
        <div className="section-header">
          <span className="eyebrow">Vídeo Pitch · 3 minutos</span>
          <h2>O projeto, em três minutos.</h2>
          <p>
            Apresentação completa do problema, da solução, do MVP e do impacto
            esperado.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            paddingBottom: "45%",
            height: 0,
            maxWidth: "900px",
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/MDea45GRuwk"
            title="Wellbe-in — Vídeo Pitch"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Link público:{" "}
          <a
            href="https://youtu.be/MDea45GRuwk"
            style={{ color: "var(--balance)" }}
          >
            https://youtu.be/MDea45GRuwk
          </a>
          &nbsp;·&nbsp;
        </p>
      </section>

      <section id="sobre-projeto" className="section container">
        <div className="section-header">
          <span className="eyebrow">Sobre o projeto</span>
          <h2>Conheça a equipe e a Wellbe-in</h2>
          <p>
            Wellbe-in é um produto desenvolvido como parte do Challenge FIAP ×
            THM Estatística por estudantes de Engenharia de Software.
          </p>
        </div>

        <Link to="/sobre" className="btn btn--ghost">
          Ver equipe e tecnologias completas
          <svg
            className="btn__arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </main>
  );
};

export default Home;
