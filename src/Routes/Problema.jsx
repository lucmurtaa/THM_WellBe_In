import React from 'react'
import { Link } from 'react-router-dom'

const Problema = () => {
  return (
    <div>
      <div>
        <section className="page-hero container">
          <span className="eyebrow">O problema</span>
          <h1>O desgaste que se acumula no <em className="italic">silêncio</em> da rotina</h1>
          <p>Sinais de estresse, sono ruim e cansaço mental raramente surgem do nada. Eles acumulam-se em meses de hábitos digitais desregulados, alertas invisíveis que ignoramos todos os dias.</p>
        </section>

        <section className="section container">
          <div className="section-header">
            <span className="eyebrow">O impacto real</span>
            <h2>O custo invisível da falta de prevenção.</h2>
            <p>Negligenciar pequenos sinais na rotina cobra um preço alto da nossa saúde física e mental. Os dados mostram o risco de agir apenas quando o corpo falha.</p>
          </div>

          <div className="ctx-grid">
            <div className="ctx-card">
              <div className="ctx-card__num">74<small>%</small></div>
              <h3>da população adulta — Sem monitoramento diário</h3>
              <p>Não acompanha indicadores básicos de bem-estar, como qualidade do sono e níveis de estresse. O cuidado só acontece após o surgimento de sintomas.</p>
              <div className="ctx-card__src">Pesquisa Vigitel · Ministério da Saúde</div>
            </div>

            <div className="ctx-card">
              <div className="ctx-card__num">72<small>%</small></div>
              <h3>das mortes no Brasil — Causadas por doenças crônicas</h3>
              <p>A grande maioria dos casos de DCNTs (como hipertensão e problemas cardiovasculares) está ligada a hábitos diários que poderiam ser evitados com equilíbrio.</p>
              <div className="ctx-card__src">OMS · Relatório global de DCNTs</div>
            </div>

            <div className="ctx-card">
              <div className="ctx-card__num">63<small>%</small></div>
              <h3>dos adultos brasileiros — Abaixo do mínimo de atividade física</h3>
              <p>Não atingem os 150 minutos semanais recomendados, agravando o sedentarismo e o cansaço muscular causados pela rotina sentada.</p>
              <div className="ctx-card__src">IBGE · PNS 2019</div>
            </div>

            <div className="ctx-card">
              <div className="ctx-card__num">9.3<small>M</small></div>
              <h3>brasileiros — Diagnosticados com depressão</h3>
              <p>O maior índice da América Latina. O esgotamento mental e a ansiedade avançam silenciosamente sem que os primeiros sinais sejam percebidos.</p>
              <div className="ctx-card__src">OMS · Relatório de saúde mental</div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="section-header">
            <span className="eyebrow">A lacuna</span>
            <h2>O paciente moderno gera dados — mas ninguém os lê.</h2>
            <p>Smartwatches, aplicativos de bem-estar, planilhas pessoais. A informação existe, mas falta uma camada que conecte os pontos e devolva sentido clínico ao usuário.</p>
          </div>

          <ul className="impact-list">
        <li className="impact-item">
          <div className="impact-item__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
              </div>
              <div>
                <h4>Sintomas normalizados</h4>
                <p>Fadiga, insônia e ansiedade tecnológica são tratados como normais por meses, até que se transformem em um esgotamento real (burnout).</p>
              </div>
            </li>
            <li className="impact-item">
              <div className="impact-item__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></svg>
              </div>
              <div>
                <h4>Dados fragmentados</h4>
                <p>O celular marca o tempo de tela, o relógio mede o sono, a mente sente o cansaço. Sem uma visão integrada, os padrões de desgaste ficam invisíveis.</p>
              </div>
            </li>
            <li className="impact-item">
              <div className="impact-item__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M2 12h20" /></svg>
              </div>
              <div>
                <h4>Falta de contexto</h4>
                <p>Saber que você passou "7 horas no computador" é apenas um número. Entender que o uso contínuo no fim da noite está destruindo seu sono é um diagnóstico preventivo.</p>
              </div>
            </li>
            <li className="impact-item">
              <div className="impact-item__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 12h6M12 9v6" /><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <div>
                <h4>Custo do descuido</h4>
                <p>Agir apenas quando o corpo falha custa caro para a mente e para a saúde. Antecipar o desgaste custa menos e devolve a qualidade de vida.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="section container">
          <div className="section-header" style={{textAlign: 'center', margin: '0 auto'}}>
            <h2>Entenda o padrão.<em className="italic"> Mude o hábito.</em></h2>
          </div>
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <Link to="/solucao" className="btn btn--primary">
              Conhecer a solução
              <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Problema