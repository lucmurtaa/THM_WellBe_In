import React from 'react'
import { Link } from 'react-router-dom'

const Problema = () => {
  return (
    <div>
      <div>
        <section className="page-hero container">
          <span className="eyebrow">Diagnóstico</span>
          <h1>A saúde se perde no <em className="italic">silêncio</em> dos dias.</h1>
          <p>Doenças crônicas raramente surgem do nada. Elas se acumulam em meses de sono ruim, estresse não tratado, sedentarismo e alimentação desregulada, sinais que poderiam ter sido vistos a tempo.</p>
        </section>

        <section className="section container">
          <div className="section-header">
            <span className="eyebrow">Por que isso importa</span>
            <h2>O custo invisível da prevenção que não acontece.</h2>
            <p>O Brasil enfrenta um paradoxo: tem um sistema de saúde universal, mas a prevenção primária segue subutilizada.</p>
          </div>

          <div className="ctx-grid">
            <div className="ctx-card">
              <div className="ctx-card__num">74<small>%</small></div>
              <h3>Não monitoram a saúde</h3>
              <p>Da população adulta brasileira não acompanha indicadores básicos de saúde como sono, estresse e atividade física no cotidiano. O cuidado é reativo, não preventivo.</p>
              <div className="ctx-card__src">Pesquisa Vigitel · Ministério da Saúde</div>
            </div>

            <div className="ctx-card">
              <div className="ctx-card__num">72<small>%</small></div>
              <h3>Mortes por doenças crônicas</h3>
              <p>Das mortes no Brasil são causadas por DCNTs (doenças crônicas não transmissíveis) em sua maioria preveníveis com mudanças de hábito.</p>
              <div className="ctx-card__src">OMS · Relatório global de DCNTs</div>
            </div>

            <div className="ctx-card">
              <div className="ctx-card__num">63<small>%</small></div>
              <h3>Adultos sedentários</h3>
              <p>Não atingem o mínimo de 150 minutos semanais de atividade física moderada recomendados pela OMS, aumentando significativamente o risco cardiovascular.</p>
              <div className="ctx-card__src">IBGE · PNS 2019</div>
            </div>

            <div className="ctx-card">
              <div className="ctx-card__num">9.3<small>M</small></div>
              <h3>Brasileiros com depressão</h3>
              <p>Identificados como diagnóstico clínico — o maior número da América Latina. A maioria não recebe acompanhamento contínuo nem percebe os primeiros sinais.</p>
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
                <h4>Detecção tardia</h4>
                <p>Sintomas como fadiga, insônia e ansiedade são normalizados por meses até virarem diagnóstico. O tempo entre primeiro sinal e atendimento é, em média, superior a 11 meses.</p>
              </div>
            </li>
            <li className="impact-item">
              <div className="impact-item__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></svg>
              </div>
              <div>
                <h4>Dados em silos</h4>
                <p>Cada app armazena uma fração: sono em um, exercício em outro, humor em um terceiro. Sem visão integrada, padrões clinicamente relevantes ficam invisíveis.</p>
              </div>
            </li>
            <li className="impact-item">
              <div className="impact-item__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M2 12h20" /></svg>
              </div>
              <div>
                <h4>Falta de tradução clínica</h4>
                <p>"6h30 de sono" é um número. "Sono crônico abaixo do ideal há 12 dias, com correlação com aumento de estresse" é um insight. Falta a segunda camada.</p>
              </div>
            </li>
            <li className="impact-item">
              <div className="impact-item__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 12h6M12 9v6" /><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <div>
                <h4>Sobrecarga do SUS</h4>
                <p>Consultas que poderiam ser preventivas viram urgências. Cada R$ 1 investido em prevenção primária economiza até R$ 5 em tratamento, segundo a OMS.</p>
              </div>
            </li>
          </ul>

          <blockquote className="quote">
            "A revolução não está em coletar mais dados de saúde — está em transformar dados em decisões que o paciente entende e age sobre eles."
            <cite>— Premissa do projeto HealthTrack AI</cite>
          </blockquote>
        </section>

        <section className="section container">
          <div className="section-header" style={{textAlign: 'center', margin: '0 auto'}}>
            <h2>Esse é o problema. <em className="italic">Veja a solução.</em></h2>
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