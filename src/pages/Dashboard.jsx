import React, { useEffect, useMemo, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { BAND_INFO, band, buildCrossInsights, buildDailyInsights, buildRecommendations, chartHistory, loadHistory, pushToday, scoreBalance, DEFAULT_FORM } from '../lib/dashboard';

const METRIC_DEFS = [
  { title: 'Tempo de tela', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
  { title: 'Pausas reais', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 2" /></svg> },
  { title: 'Sono', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> },
  { title: 'Sobrecarga', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> }
];

const STATE_HELPERS = {
  telaState: (hours) => (hours <= 6 ? 'ok' : hours <= 8 ? 'warn' : 'bad'),
  telaCaption: (hours) => (hours <= 4 ? 'Dentro do ideal' : hours <= 6 ? 'Equilibrado' : hours <= 8 ? 'Acumulando desgaste' : 'Exposição elevada'),
  pausaState: (pauses) => (pauses >= 5 ? 'ok' : pauses >= 3 ? 'ok' : pauses >= 1 ? 'warn' : 'bad'),
  pausaCaption: (pauses) => (pauses >= 5 ? 'Excelente cadência' : pauses >= 3 ? 'Boa cadência' : pauses >= 1 ? 'Pode aumentar' : 'Nenhuma pausa real'),
  sonoState: (subScore) => (subScore >= 18 ? 'ok' : subScore >= 12 ? 'warn' : 'bad'),
  sonoCaption: (hours, quality) => {
    const duration = hours >= 7 && hours <= 9 ? 'duração ideal' : hours >= 6 ? 'duração curta' : 'duração insuficiente';
    const qualityMap = { muitoboa: 'qualidade ótima', boa: 'qualidade boa', media: 'qualidade média', ruim: 'qualidade ruim', muitoruim: 'qualidade péssima' };
    return `${duration} · ${qualityMap[quality] ?? ''}`;
  },
  sobrecargaLabel: (value) => ({ tranquilo: 'Tranquilo', controle: 'Sob controle', limite: 'No limite', esgotado: 'Esgotado' })[value] ?? '—',
  sobrecargaState: (value) => (value === 'tranquilo' || value === 'controle' ? 'ok' : value === 'limite' ? 'warn' : 'bad'),
  sobrecargaPct: (value) => ({ tranquilo: 100, controle: 75, limite: 35, esgotado: 10 })[value] ?? 50,
  sobrecargaCaption: (value) => ({ tranquilo: 'Estado mental saudável', controle: 'Sob gestão', limite: 'Risco de esgotamento', esgotado: 'Recuperação urgente' })[value] ?? ''
};

function useDashboard() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [history, setHistory] = useState(() => loadHistory());
  const [lastUpdated, setLastUpdated] = useState('agora');

  const analysis = useMemo(() => scoreBalance(form), [form]);
  const bandKey = useMemo(() => band(analysis.score), [analysis.score]);
  const bandInfo = BAND_INFO[bandKey];
  const dailyInsights = useMemo(() => buildDailyInsights(form, analysis.parts), [analysis.parts, form]);
  const crossInsights = useMemo(() => buildCrossInsights(history), [history]);
  const recommendations = useMemo(() => buildRecommendations(form, analysis.score, bandKey), [analysis.score, bandKey, form]);
  const chartPoints = useMemo(() => chartHistory(history), [history]);

  useEffect(() => {
    if (history.length === 0) {
      const initialHistory = pushToday(history, { ...form, score: analysis.score });
      setHistory(initialHistory);
    }
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAnalyze = () => {
    const nextHistory = pushToday(history, { ...form, score: analysis.score });
    setHistory(nextHistory);
    setLastUpdated(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  };

  return { form, history, analysis, bandKey, bandInfo, dailyInsights, crossInsights, recommendations, chartPoints, lastUpdated, updateField, handleAnalyze };
}

function ToggleGroup({ label, value, options, onChange }) {
  return (
    <div className="field">
      <label style={{ display: 'block', marginBottom: '0.6rem' }}>{label}</label>
      <div className="toggle-grid" data-group={label}>
        {options.map((option) => (
          <button key={option.value} type="button" className={`toggle-btn ${value === option.value ? 'active' : ''}`} data-value={option.value} onClick={() => onChange(option.value)}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ id, title, icon, value, unit, state, barPct, caption }) {
  return (
    <div className="metric" id={id} data-state={state}>
      <div className="metric__head"><span className="metric__title">{title}</span><span className="metric__icon">{icon}</span></div>
      <div className="metric__num"><span className="metric__num-val">{value}</span><small className="metric__num-unit">{unit}</small></div>
      <div className="metric__bar"><div className="metric__bar-fill" style={{ width: `${barPct}%` }} /></div>
      <div className="metric__caption">{caption}</div>
    </div>
  );
}

function TrendChart({ points }) {
  const width = 640;
  const height = 240;
  const padding = 32;
  const linePoints = points.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(1, points.length - 1);
    const y = height - padding - ((point.score / 100) * (height - padding * 2));
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="trend-chart" role="img" aria-label="Tendência semanal do score de equilíbrio">
      {[0, 25, 50, 75, 100].map((tick) => {
        const y = height - padding - ((tick / 100) * (height - padding * 2));
        return <line key={tick} x1={padding} y1={y} x2={width - padding} y2={y} className="chart-grid-line" />;
      })}
      {points.map((point, index) => {
        const x = padding + (index * (width - padding * 2)) / Math.max(1, points.length - 1);
        const y = height - padding - ((point.score / 100) * (height - padding * 2));
        return (<g key={`${point.day}-${index}`}><circle cx={x} cy={y} r="4" className="trend-chart__dot" /><text x={x} y={height - 10} className="trend-chart__label" textAnchor="middle">{point.day}</text><text x={x} y={y - 10} className="trend-chart__value" textAnchor="middle">{point.score}</text></g>);
      })}
      <polyline points={linePoints} className="trend-chart__line" />
    </svg>
  );
}

function BreakdownBars({ parts, maxParts }) {
  const rows = [['Horas de tela', parts.pTela, maxParts.pTela], ['Tela antes de dormir', parts.pAntesDormir, maxParts.pAntesDormir], ['Pausas analógicas', parts.pPausas, maxParts.pPausas], ['Sono', parts.pSonoHoras + parts.pSonoQual, maxParts.pSonoHoras + maxParts.pSonoQual], ['Sobrecarga', parts.pSobrecarga, maxParts.pSobrecarga]];
  return <div className="breakdown-list">{rows.map(([label, value, max]) => (<div className="breakdown-row" key={label}><div className="breakdown-row__head"><span>{label}</span><strong>{value} / {max}</strong></div><div className="breakdown-row__bar"><div className="breakdown-row__fill" style={{ width: `${(value / max) * 100}%` }} /></div></div>))}</div>;
}

function InsightsList({ title, note, items, emptyLabel }) {
  return (
    <div className="alerts">
      <div className="alerts__head"><h3>{title}</h3><span className="alerts__count">{items.length ? `${items.length} sinais` : emptyLabel}</span></div>
      <p className="alerts__note">{note}</p>
      <div className="alert-list">{items.map((item) => (<article className={`alert alert--${item.level}`} key={`${item.title}-${item.tag}`}><div className="alert__icon">{item.icon}</div><div><span className="alert__tag">{item.tag}</span><h4>{item.title}</h4><p>{item.msg}</p></div></article>))}</div>
    </div>
  );
}

function Recommendations({ items }) {
  return (<div className="reco"><h3>Recomendações para os próximos 7 dias</h3><div className="reco-list">{items.map((item) => (<div className="reco-item" key={item}><span className="reco-item__dot" /><p>{item}</p></div>))}</div></div>);
}

export default function Dashboard() {
  const { form, history, analysis, bandInfo, dailyInsights, crossInsights, recommendations, chartPoints, lastUpdated, updateField, handleAnalyze } = useDashboard();
  const score = analysis.score;
  const fatigue = 100 - score;
  const activeInsights = [...dailyInsights, ...crossInsights];

  const updateRange = (id, value) => updateField(id, Number(value));

  return (
    <main className="dashboard-shell">
      <div className="container">
        <div className="dash-head"><div className="dash-head__left"><span className="eyebrow">MVP · Aplicação ao vivo</span><h1>Painel de equilíbrio digital</h1><p>Registre os indicadores da sua rotina digital à esquerda. Seu Score de Equilíbrio e a análise comportamental atualizam em tempo real.</p></div><div className="dash-head__meta"><span className="dash-pill"><span className="dash-pill__dot" />Sistema operando</span><span className="dash-pill">Última análise · {lastUpdated}</span></div></div>

        <div className="dash-grid">
          <aside className="form-panel">
            <h2>Registro do dia</h2>
            <p className="form-panel__sub">Responda sobre sua rotina e clique em Analisar.</p>
            <div className="form-group"><div className="form-group__label">Rotina digital</div><div className="field"><div className="field__row"><label htmlFor="horasTela">Horas de tela hoje</label><span className="field__val">{form.horasTela}</span></div><input type="range" id="horasTela" min="0" max="14" step="0.5" value={form.horasTela} onChange={(event) => updateRange('horasTela', event.target.value)} /></div><ToggleGroup label="Usou telas na última hora antes de dormir?" value={form.telasAntesDormir} options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]} onChange={(value) => updateField('telasAntesDormir', value)} /></div>
            <div className="form-group"><div className="form-group__label">Pausas durante o dia</div><div className="field"><div className="field__row"><label htmlFor="pausasAnalogicas">Pausas fora das telas</label><span className="field__val">{form.pausasAnalogicas}</span></div><input type="range" id="pausasAnalogicas" min="0" max="10" step="1" value={form.pausasAnalogicas} onChange={(event) => updateRange('pausasAnalogicas', event.target.value)} /></div><div className="field"><div className="field__row"><label htmlFor="pausasDigitais">Pausas com celular / redes</label><span className="field__val">{form.pausasDigitais}</span></div><input type="range" id="pausasDigitais" min="0" max="10" step="1" value={form.pausasDigitais} onChange={(event) => updateRange('pausasDigitais', event.target.value)} /></div></div>
            <div className="form-group"><div className="form-group__label">Sono e recuperação</div><div className="field"><div className="field__row"><label htmlFor="horasSono">Horas dormidas</label><span className="field__val">{form.horasSono}</span></div><input type="range" id="horasSono" min="0" max="12" step="0.5" value={form.horasSono} onChange={(event) => updateRange('horasSono', event.target.value)} /></div><ToggleGroup label="Qualidade do sono" value={form.qualidadeSono} options={[{ value: 'muitoboa', label: 'Muito boa' }, { value: 'boa', label: 'Boa' }, { value: 'media', label: 'Média' }, { value: 'ruim', label: 'Ruim' }, { value: 'muitoruim', label: 'Muito ruim' }]} onChange={(value) => updateField('qualidadeSono', value)} /></div>
            <div className="form-group"><div className="form-group__label">Estado mental</div><ToggleGroup label="Em qual nível você se sentiu mentalmente?" value={form.sobrecarga} options={[{ value: 'tranquilo', label: 'Tranquilo' }, { value: 'controle', label: 'Sob controle' }, { value: 'limite', label: 'No limite' }, { value: 'esgotado', label: 'Esgotado' }]} onChange={(value) => updateField('sobrecarga', value)} /></div>
            <div className="form-group"><div className="form-group__label">Dados complementares</div><ToggleGroup label="Disposição hoje" value={form.disposicao} options={[{ value: 'muitoalta', label: 'Muito alta' }, { value: 'alta', label: 'Alta' }, { value: 'normal', label: 'Normal' }, { value: 'baixa', label: 'Baixa' }, { value: 'muitobaixa', label: 'Muito baixa' }]} onChange={(value) => updateField('disposicao', value)} /><ToggleGroup label="Atividade física" value={form.atividade} options={[{ value: 'mais1h', label: 'Mais de 1h' }, { value: '30a60', label: '30–60 min' }, { value: 'ate30', label: 'Até 30 min' }, { value: 'nenhuma', label: 'Não pratiquei' }]} onChange={(value) => updateField('atividade', value)} /><ToggleGroup label="Desconforto físico" value={form.desconforto} options={[{ value: 'nenhum', label: 'Nenhum' }, { value: 'leve', label: 'Leve' }, { value: 'moderado', label: 'Moderado' }, { value: 'intenso', label: 'Intenso' }]} onChange={(value) => updateField('desconforto', value)} /></div>
            <button type="button" id="analyzeBtn" className="btn btn--analyze" onClick={handleAnalyze}>Analisar meu dia<svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></button>
          </aside>

          <div className="dash-panel">
            <div className="risk-hero" data-band={band(analysis.score)}><div className="risk-hero__inner"><div><span className="risk-status">{bandInfo.label}</span><h2>Seu Score de Equilíbrio Digital</h2><p>{bandInfo.desc}</p><div className="dual-score"><div className="dual-score__item"><span className="dual-score__label">Equilíbrio</span><span className="dual-score__val">{score}</span></div><div className="dual-score__divider" /><div className="dual-score__item"><span className="dual-score__label">Desgaste</span><span className="dual-score__val dual-score__val--fatigue">{fatigue}</span></div></div></div><div className="gauge"><svg viewBox="0 0 200 200"><circle className="gauge__track" cx="100" cy="100" r="84" /><circle className="gauge__fill" cx="100" cy="100" r="84" strokeDasharray="528" strokeDashoffset={528 * (1 - score / 100)} /></svg><div className="gauge__value"><div className="gauge__num">{score}</div><div className="gauge__lbl">Equilíbrio / 100</div></div></div></div></div>

            <div className="metric-grid"><MetricCard id="metricTela" title={METRIC_DEFS[0].title} icon={METRIC_DEFS[0].icon} value={form.horasTela.toFixed(1)} unit="h" state={STATE_HELPERS.telaState(form.horasTela)} barPct={Math.min(100, (form.horasTela / 12) * 100)} caption={STATE_HELPERS.telaCaption(form.horasTela)} /><MetricCard id="metricPausas" title={METRIC_DEFS[1].title} icon={METRIC_DEFS[1].icon} value={form.pausasAnalogicas} unit="pausas" state={STATE_HELPERS.pausaState(form.pausasAnalogicas)} barPct={Math.min(100, (form.pausasAnalogicas / 6) * 100)} caption={STATE_HELPERS.pausaCaption(form.pausasAnalogicas)} /><MetricCard id="metricSono" title={METRIC_DEFS[2].title} icon={METRIC_DEFS[2].icon} value={form.horasSono.toFixed(1)} unit="h" state={STATE_HELPERS.sonoState(analysis.parts.pSonoHoras + analysis.parts.pSonoQual)} barPct={((analysis.parts.pSonoHoras + analysis.parts.pSonoQual) / 25) * 100} caption={STATE_HELPERS.sonoCaption(form.horasSono, form.qualidadeSono)} /><MetricCard id="metricSobrecarga" title={METRIC_DEFS[3].title} icon={METRIC_DEFS[3].icon} value={STATE_HELPERS.sobrecargaLabel(form.sobrecarga)} unit="" state={STATE_HELPERS.sobrecargaState(form.sobrecarga)} barPct={STATE_HELPERS.sobrecargaPct(form.sobrecarga)} caption={STATE_HELPERS.sobrecargaCaption(form.sobrecarga)} /></div>

            <div className="charts-grid"><div className="chart-card"><div className="chart-card__head"><div><h3>Tendência semanal</h3><p>Score de Equilíbrio Digital, últimos 7 dias</p></div><div className="chart-card__legend"><span className="legend-dot" style={{ '--swatch': 'var(--balance)' }}>Equilíbrio</span></div></div><div className="chart-canvas"><TrendChart points={chartHistory(history)} /></div></div><div className="chart-card"><div className="chart-card__head"><div><h3>Por dimensão</h3><p>Pontuação obtida × máxima</p></div></div><div className="chart-canvas chart-canvas--small"><BreakdownBars parts={analysis.parts} maxParts={analysis.maxParts} /></div></div></div>

            <InsightsList title="Análise comportamental" note={history.length >= 7 ? 'Insights cruzam seu histórico. Análises personalizadas aparecem a partir de 7 dias de uso.' : 'Insights cruzam seu histórico. Análises personalizadas aparecem a partir de 7 dias de uso.'} items={activeInsights} emptyLabel="0 sinais" />
            <Recommendations items={recommendations} />
            <div className="disclaimer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg><p>O Wellbe-in não realiza diagnósticos médicos. Seu objetivo é identificar padrões associados ao desgaste digital e incentivar hábitos mais saudáveis.</p></div>
          </div>
        </div>
      </div>
    </main>
  );
}