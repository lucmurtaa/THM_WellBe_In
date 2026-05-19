const STORAGE_KEY = 'wellbein_history';

export const DEFAULT_FORM = {
  horasTela: 6,
  telasAntesDormir: 'nao',
  pausasAnalogicas: 3,
  pausasDigitais: 2,
  horasSono: 7,
  qualidadeSono: 'boa',
  sobrecarga: 'controle',
  disposicao: 'normal',
  atividade: 'ate30',
  desconforto: 'nenhum'
};

const scoreClamps = (value) => Math.max(0, Math.min(100, value));

export function scoreBalance(form) {
  let pTela;
  if (form.horasTela <= 4) pTela = 25;
  else if (form.horasTela <= 6) pTela = 18;
  else if (form.horasTela <= 8) pTela = 10;
  else pTela = 0;

  const pAntesDormir = form.telasAntesDormir === 'nao' ? 10 : 0;

  let pPausas;
  if (form.pausasAnalogicas >= 5) pPausas = 20;
  else if (form.pausasAnalogicas >= 3) pPausas = 15;
  else if (form.pausasAnalogicas >= 1) pPausas = 8;
  else pPausas = 0;

  let pSonoHoras;
  if (form.horasSono >= 7 && form.horasSono <= 9) pSonoHoras = 15;
  else if (Math.floor(form.horasSono) === 6) pSonoHoras = 10;
  else if (Math.floor(form.horasSono) === 5) pSonoHoras = 5;
  else pSonoHoras = 0;

  const pSonoQual = ({ muitoboa: 10, boa: 8, media: 5, ruim: 2, muitoruim: 0 })[form.qualidadeSono] ?? 5;
  const pSobrecarga = ({ tranquilo: 20, controle: 15, limite: 5, esgotado: 0 })[form.sobrecarga] ?? 10;

  const total = pTela + pAntesDormir + pPausas + pSonoHoras + pSonoQual + pSobrecarga;

  return {
    score: scoreClamps(total),
    parts: { pTela, pAntesDormir, pPausas, pSonoHoras, pSonoQual, pSobrecarga },
    maxParts: { pTela: 25, pAntesDormir: 10, pPausas: 20, pSonoHoras: 15, pSonoQual: 10, pSobrecarga: 20 },
    raw: form
  };
}

export function band(score) {
  if (score >= 80) return 'equilibrada';
  if (score >= 60) return 'atencao';
  if (score >= 40) return 'moderado';
  return 'alto';
}

export const BAND_INFO = {
  equilibrada: { label: 'Rotina equilibrada', desc: 'Seus indicadores estão dentro de faixas saudáveis. A rotina digital de hoje favorece a sua recuperação física e mental — mantenha a consistência.' },
  atencao: { label: 'Atenção', desc: 'Alguns sinais de fadiga começam a aparecer. Pequenos ajustes hoje evitam que esses padrões se acumulem ao longo da semana.' },
  moderado: { label: 'Desgaste moderado', desc: 'Múltiplas dimensões estão fora do ideal. Reduzir o tempo de tela e melhorar a recuperação são prioridades para os próximos dias.' },
  alto: { label: 'Alto desgaste', desc: 'Sua rotina mostra sinais consistentes de sobrecarga digital. Considere uma desconexão real e priorize sono, pausas analógicas e atividade física.' }
};

const desconfortoScale = { nenhum: 0, leve: 1, moderado: 2, intenso: 3 };
const disposicaoScale = { muitoalta: 4, alta: 3, normal: 2, baixa: 1, muitobaixa: 0 };
const qualidadeScale = { muitoboa: 4, boa: 3, media: 2, ruim: 1, muitoruim: 0 };
const sobrecargaScale = { tranquilo: 0, controle: 1, limite: 2, esgotado: 3 };

const mean = (values) => (values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0);

export function seedHistory() {
  return [
    { day: 'Seg', score: 68, horasTela: 5.5, telasAntesDormir: 'nao', pausasAnalogicas: 4, pausasDigitais: 2, horasSono: 7.5, qualidadeSono: 'boa', sobrecarga: 'controle', disposicao: 'alta', desconforto: 'leve' },
    { day: 'Ter', score: 74, horasTela: 4.5, telasAntesDormir: 'nao', pausasAnalogicas: 5, pausasDigitais: 2, horasSono: 8, qualidadeSono: 'muitoboa', sobrecarga: 'tranquilo', disposicao: 'alta', desconforto: 'nenhum' },
    { day: 'Qua', score: 58, horasTela: 7.5, telasAntesDormir: 'sim', pausasAnalogicas: 2, pausasDigitais: 3, horasSono: 6, qualidadeSono: 'media', sobrecarga: 'limite', disposicao: 'normal', desconforto: 'moderado' },
    { day: 'Qui', score: 62, horasTela: 6.5, telasAntesDormir: 'sim', pausasAnalogicas: 3, pausasDigitais: 2, horasSono: 6.5, qualidadeSono: 'boa', sobrecarga: 'controle', disposicao: 'normal', desconforto: 'leve' },
    { day: 'Sex', score: 51, horasTela: 8.5, telasAntesDormir: 'sim', pausasAnalogicas: 1, pausasDigitais: 4, horasSono: 5.5, qualidadeSono: 'ruim', sobrecarga: 'limite', disposicao: 'baixa', desconforto: 'intenso' },
    { day: 'Sáb', score: 77, horasTela: 4, telasAntesDormir: 'nao', pausasAnalogicas: 6, pausasDigitais: 1, horasSono: 8.5, qualidadeSono: 'muitoboa', sobrecarga: 'tranquilo', disposicao: 'alta', desconforto: 'nenhum' }
  ];
}

export function loadHistory() {
  if (typeof window === 'undefined') return seedHistory();

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    return seedHistory();
  }

  return seedHistory();
}

export function saveHistory(history) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors in constrained environments.
  }
}

export function pushToday(history, entry) {
  const filtered = history.filter((item) => item.day !== 'Hoje');
  const trimmed = filtered.slice(-6);
  const nextHistory = [...trimmed, { day: 'Hoje', ...entry }];
  saveHistory(nextHistory);
  return nextHistory;
}

export function buildDailyInsights(form, parts) {
  const insights = [];

  if (parts.pTela <= 10) {
    insights.push({
      level: form.horasTela > 8 ? 'bad' : 'warn',
      icon: '⌨',
      title: 'Exposição digital elevada',
      msg: `Você passou ${form.horasTela.toFixed(1)} horas em frente a telas hoje. Exposições acima de 8h estão associadas a fadiga visual, tensão cervical e dificuldade de concentração.`,
      tag: 'Hoje'
    });
  }

  if (form.telasAntesDormir === 'sim') {
    insights.push({
      level: 'info',
      icon: '🌙',
      title: 'Tela na última hora antes de dormir',
      msg: 'A luz azul e o conteúdo estimulante atrasam a produção de melatonina. Tente um buffer de 30-60 minutos sem telas antes de deitar.',
      tag: 'Hoje'
    });
  }

  if (parts.pPausas <= 8) {
    insights.push({
      level: form.pausasAnalogicas === 0 ? 'bad' : 'warn',
      icon: '⏸',
      title: 'Pausas analógicas insuficientes',
      msg: `Apenas ${form.pausasAnalogicas} pausa(s) fora das telas hoje. Pausas reais reduzem a fadiga cognitiva mais do que rolar o feed.`,
      tag: 'Hoje'
    });
  }

  if (parts.pSonoHoras + parts.pSonoQual <= 12) {
    insights.push({
      level: form.horasSono < 6 ? 'bad' : 'warn',
      icon: '😴',
      title: 'Recuperação incompleta',
      msg: `Você dormiu ${form.horasSono.toFixed(1)}h com qualidade ${({ muitoboa: 'muito boa', boa: 'boa', media: 'média', ruim: 'ruim', muitoruim: 'muito ruim' })[form.qualidadeSono]}. O sono é o principal mecanismo de recuperação após dias longos de tela.`,
      tag: 'Hoje'
    });
  }

  if (form.sobrecarga === 'limite' || form.sobrecarga === 'esgotado') {
    insights.push({
      level: form.sobrecarga === 'esgotado' ? 'bad' : 'warn',
      icon: '⚡',
      title: 'Estado mental sob pressão',
      msg: `Você registrou "${({ tranquilo: 'tranquilo', controle: 'sob controle', limite: 'no limite', esgotado: 'esgotado' })[form.sobrecarga]}" hoje. Respiração consciente, contato com a natureza e desconexão real são intervenções comprovadas.`,
      tag: 'Hoje'
    });
  }

  if (form.desconforto !== 'nenhum') {
    insights.push({
      level: form.desconforto === 'intenso' ? 'bad' : 'warn',
      icon: '✚',
      title: 'Desconforto físico presente',
      msg: `O desconforto físico foi marcado como ${form.desconforto}. Ajuste postura, iluminação e pausas para impedir que a tensão se acumule.`,
      tag: 'Hoje'
    });
  }

  return insights;
}

export function buildCrossInsights(history) {
  if (history.length < 7) return [];

  const insights = [];

  const highScreen = history.filter((item) => item.horasTela > 8);
  const lowScreen = history.filter((item) => item.horasTela <= 6);
  if (highScreen.length >= 2 && lowScreen.length >= 2) {
    const meanHigh = mean(highScreen.map((item) => desconfortoScale[item.desconforto] ?? 0));
    const meanLow = mean(lowScreen.map((item) => desconfortoScale[item.desconforto] ?? 0));
    if (meanHigh - meanLow >= 0.6) {
      insights.push({ level: 'warn', icon: '⌨', title: 'Tela × desconforto físico', msg: 'Você tende a sentir mais desconforto físico em dias acima de 8 horas de tela. Considere alongamentos a cada 60-90 minutos e ajustes ergonômicos.', tag: 'Cruzamento' });
    }
  }

  const withScreen = history.filter((item) => item.telasAntesDormir === 'sim');
  const withoutScreen = history.filter((item) => item.telasAntesDormir === 'nao');
  if (withScreen.length >= 2 && withoutScreen.length >= 2) {
    const meanWith = mean(withScreen.map((item) => qualidadeScale[item.qualidadeSono] ?? 2));
    const meanWithout = mean(withoutScreen.map((item) => qualidadeScale[item.qualidadeSono] ?? 2));
    if (meanWithout - meanWith >= 0.5) {
      insights.push({ level: 'info', icon: '🌙', title: 'Telas antes de dormir × qualidade do sono', msg: 'Nos dias em que você evita telas antes de dormir, sua qualidade de sono tende a melhorar. A exposição à luz azul atrasa a liberação de melatonina.', tag: 'Cruzamento' });
    }
  }

  const longSleep = history.filter((item) => item.horasSono >= 7);
  const shortSleep = history.filter((item) => item.horasSono < 6);
  if (longSleep.length >= 2 && shortSleep.length >= 2) {
    const meanLong = mean(longSleep.map((item) => disposicaoScale[item.disposicao] ?? 2));
    const meanShort = mean(shortSleep.map((item) => disposicaoScale[item.disposicao] ?? 2));
    if (meanLong - meanShort >= 0.6) {
      insights.push({ level: 'ok', icon: '☀', title: 'Sono × disposição', msg: 'Sua disposição costuma ser maior em dias com mais de 7 horas de sono. A consistência do horário de dormir potencializa esse efeito.', tag: 'Cruzamento' });
    }
  }

  const moreAnalog = history.filter((item) => (item.pausasAnalogicas ?? 0) > (item.pausasDigitais ?? 0));
  const moreDigital = history.filter((item) => (item.pausasDigitais ?? 0) > (item.pausasAnalogicas ?? 0));
  if (moreAnalog.length >= 2 && moreDigital.length >= 2) {
    const meanAnalog = mean(moreAnalog.map((item) => sobrecargaScale[item.sobrecarga] ?? 1));
    const meanDigital = mean(moreDigital.map((item) => sobrecargaScale[item.sobrecarga] ?? 1));
    if (meanDigital - meanAnalog >= 0.5) {
      insights.push({ level: 'info', icon: '⏸', title: 'Pausas analógicas × sobrecarga', msg: 'Nos dias com mais pausas fora das telas, você tende a terminar o dia menos sobrecarregado. Trocar feed por janela funciona como reset cognitivo.', tag: 'Cruzamento' });
    }
  }

  const recentFive = history.slice(-5);
  const heavy = recentFive.filter((item) => item.sobrecarga === 'limite' || item.sobrecarga === 'esgotado');
  if (heavy.length >= 3) {
    insights.push({ level: 'bad', icon: '⚠', title: 'Tendência semanal de sobrecarga', msg: `Você registrou estado "no limite" ou "esgotado" em ${heavy.length} dos últimos ${recentFive.length} dias. Esse padrão prolongado merece atenção e descanso real.`, tag: 'Alerta preventivo' });
  }

  return insights;
}

export function buildRecommendations(form, balanceScore, bandKey) {
  const recommendations = [];

  if (bandKey === 'alto') {
    recommendations.push('Priorize uma pausa real hoje: desconecte por pelo menos 30 minutos e observe como o corpo responde.');
  } else if (bandKey === 'moderado') {
    recommendations.push('Reduza uma janela de tela no fim do dia e antecipe o fechamento digital em 30 minutos.');
  } else if (bandKey === 'atencao') {
    recommendations.push('Mantenha a tendência positiva, mas separe pequenas pausas fora das telas ao longo do dia.');
  } else {
    recommendations.push('A consistência está boa. Preserve o padrão e monitore as próximas 24 horas para não acumular desgaste.');
  }

  if (form.telasAntesDormir === 'sim') {
    recommendations.push('Crie um buffer sem telas antes de dormir. Vinte a trinta minutos já ajudam a reduzir estímulo.');
  }

  if (form.pausasAnalogicas < 3) {
    recommendations.push('Inclua pausas fora das telas: caminhar, alongar ou olhar para longe pode aliviar a carga visual.');
  }

  if (form.horasSono < 7) {
    recommendations.push('Aumente o tempo de sono hoje. Se possível, antecipe o horário de deitar e reduza estímulos noturnos.');
  }

  if (form.sobrecarga === 'limite' || form.sobrecarga === 'esgotado') {
    recommendations.push('Escolha uma tarefa menos exigente e faça uma desconexão curta, mas sem alternar para outro feed digital.');
  }

  if (recommendations.length === 1) {
    recommendations.push('Seu dia está em uma faixa aceitável. Use isso como base para estabilizar o padrão durante a semana.');
  }

  return recommendations.slice(0, 4);
}

export function chartHistory(history) {
  return history.slice(-7).map((item) => ({ day: item.day, score: item.score }));
}