import { useEffect, useMemo, useReducer, useState } from "react";
import "./dashboard.css";

// Estado inicial padrão do formulário.
// Define os valores iniciais dos inputs do dashboard
// e também serve como base para resetar os campos futuramente.
const defaultForm = {
  horasTela: 6,
  telasAntesDormir: "nao",
  pausasAnalogicas: 3,
  pausasDigitais: 2,
  horasSono: 7,
  qualidadeSono: "boa",
  sobrecarga: "controle",
  disposicao: "normal",
  atividade: "ate30",
  desconforto: "nenhum",
};

// Reducer responsável por controlar todas as alterações do formulário.
// Centraliza a atualização dos campos em um único fluxo,
// facilitando manutenção e integração futura com APIs/banco de dados.
function formReducer(state, action) {
  if (action.type === "SET_FIELD") {
    return { ...state, [action.field]: action.value };
  }
  if (action.type === "RESET") {
    return { ...defaultForm };
  }
  return state;
}

// Gera datas fictícias em formato ISO para criação do histórico mockado.
// Simula registros antigos do usuário para testes visuais e análises.
function makeIsoTimestamp(daysAgo, hour, minute = 0) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

// Função principal de cálculo do Score de Equilíbrio Digital.
// Recebe os dados do formulário, calcula cada critério individualmente,
// soma as pontuações e retorna um objeto completo com score e métricas.
function scoreBalance(data) {
  let pTela;
  if (data.horasTela <= 4) pTela = 25;
  else if (data.horasTela <= 6) pTela = 18;
  else if (data.horasTela <= 8) pTela = 10;
  else pTela = 0;

  const pAntesDormir = data.telasAntesDormir === "nao" ? 10 : 0;

  let pPausas;
  if (data.pausasAnalogicas >= 5) pPausas = 20;
  else if (data.pausasAnalogicas >= 3) pPausas = 15;
  else if (data.pausasAnalogicas >= 1) pPausas = 8;
  else pPausas = 0;

  let pSonoHoras;
  if (data.horasSono >= 7 && data.horasSono <= 9) pSonoHoras = 15;
  else if (Math.floor(data.horasSono) === 6) pSonoHoras = 10;
  else if (Math.floor(data.horasSono) === 5) pSonoHoras = 5;
  else pSonoHoras = 0;

  const qualMap = { muitoboa: 10, boa: 8, media: 5, ruim: 2, muitoruim: 0 };
  const pSonoQual = qualMap[data.qualidadeSono] ?? 5;

  const sobMap = { tranquilo: 20, controle: 15, limite: 5, esgotado: 0 };
  const pSobrecarga = sobMap[data.sobrecarga] ?? 10;

  const total =
    pTela + pAntesDormir + pPausas + pSonoHoras + pSonoQual + pSobrecarga;

  return {
    score: Math.max(0, Math.min(100, total)),
    parts: {
      pTela,
      pAntesDormir,
      pPausas,
      pSonoHoras,
      pSonoQual,
      pSobrecarga,
    },
    maxParts: {
      pTela: 25,
      pAntesDormir: 10,
      pPausas: 20,
      pSonoHoras: 15,
      pSonoQual: 10,
      pSobrecarga: 20,
    },
    raw: data,
  };
}

// Classifica o score final em faixas interpretativas.
// Utilizado para determinar o estado geral do usuário no dashboard.
function classifyBand(score) {
  if (score >= 80) return "equilibrada";
  if (score >= 60) return "atencao";
  if (score >= 40) return "moderado";
  return "alto";
}

// Centraliza os textos explicativos de cada faixa de score.
// Facilita manutenção e futuras alterações de conteúdo.
const BAND_INFO = {
  equilibrada: {
    label: "Rotina equilibrada",
    desc: "Seus indicadores estão dentro de faixas saudáveis. A rotina digital de hoje favorece sua recuperação física e mental.",
  },
  atencao: {
    label: "Atenção",
    desc: "Alguns sinais de fadiga já aparecem. Ajustes temporais irão impedir que o padrão se estabilize.",
  },
  moderado: {
    label: "Desgaste moderado",
    desc: "Várias áreas estão fora do ideal. Priorize descanso, pausas e qualidade de sono nos próximos dias.",
  },
  alto: {
    label: "Alto desgaste",
    desc: "Padrões de sobrecarga digital estão prevalecendo. Desconecte de verdade e recupere energia mental e física.",
  },
};

// Verifica se o usuário possui histórico suficiente
// para liberar análises comportamentais avançadas.
// Regra mínima: 7 registros.
function hasMinimumHistory(history) {
  return history.length >= 7;
}

// Calcula média numérica de uma lista de valores.
// Utilizado nos cruzamentos comportamentais do sistema.
function average(values) {
  return values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : 0;
}

// Escalas numéricas utilizadas para transformar estados textuais
// em valores comparáveis matematicamente.
// Permitem médias, tendências e cruzamentos.
const discomfortScale = { nenhum: 0, leve: 1, moderado: 2, intenso: 3 };
const moodScale = { muitoalta: 4, alta: 3, normal: 2, baixa: 1, muitobaixa: 0 };
const sleepQualityScale = {
  muitoboa: 4,
  boa: 3,
  media: 2,
  ruim: 1,
  muitoruim: 0,
};
const overloadScale = { tranquilo: 0, controle: 1, limite: 2, esgotado: 3 };

// Analisa relação entre excesso de tela e desconforto físico.
// Gera insight caso o padrão seja recorrente no histórico.
function insightTelaDesconforto(history) {
  const excess = history.filter((item) => item.horasTela > 8);
  const balanced = history.filter((item) => item.horasTela <= 6);
  if (excess.length < 2 || balanced.length < 2) return null;
  const avgExcess = average(
    excess.map((item) => discomfortScale[item.desconforto] ?? 0),
  );
  const avgBalanced = average(
    balanced.map((item) => discomfortScale[item.desconforto] ?? 0),
  );
  if (avgExcess - avgBalanced >= 0.6) {
    return {
      level: "warn",
      icon: "⌨",
      title: "Tela × desconforto físico",
      msg: "Dias longos de tela estão associados a mais desconforto. Alongue-se e ajuste sua postura.",
      tag: "Cruzamento",
    };
  }
  return null;
}

// Analisa impacto do uso de telas antes de dormir
// na qualidade do sono do usuário.
function insightTelaAntesSono(history) {
  const comTela = history.filter((item) => item.telasAntesDormir === "sim");
  const semTela = history.filter((item) => item.telasAntesDormir === "nao");
  if (comTela.length < 2 || semTela.length < 2) return null;
  const avgCom = average(
    comTela.map((item) => sleepQualityScale[item.qualidadeSono] ?? 2),
  );
  const avgSem = average(
    semTela.map((item) => sleepQualityScale[item.qualidadeSono] ?? 2),
  );
  if (avgSem - avgCom >= 0.5) {
    return {
      level: "info",
      icon: "🌙",
      title: "Telas antes de dormir × sono",
      msg: "Quando você evita telas antes de dormir, seu sono tende a apresentar mais qualidade.",
      tag: "Cruzamento",
    };
  }
  return null;
}

// Relaciona quantidade de sono com nível de disposição diária.
// Detecta padrões de recuperação física e mental.
function insightSonoDisposicao(history) {
  const goodSleep = history.filter((item) => item.horasSono >= 7);
  const shortSleep = history.filter((item) => item.horasSono < 6);
  if (goodSleep.length < 2 || shortSleep.length < 2) return null;
  const avgGood = average(
    goodSleep.map((item) => moodScale[item.disposicao] ?? 2),
  );
  const avgShort = average(
    shortSleep.map((item) => moodScale[item.disposicao] ?? 2),
  );
  if (avgGood - avgShort >= 0.6) {
    return {
      level: "ok",
      icon: "☀",
      title: "Sono × disposição",
      msg: "Mais sono costuma significar mais disposição no dia seguinte.",
      tag: "Cruzamento",
    };
  }
  return null;
}

// Analisa se pausas analógicas reduzem a sobrecarga mental.
// Compara pausas reais vs pausas digitais.
function insightPausasSobrecarga(history) {
  const analog = history.filter(
    (item) => item.pausasAnalogicas > item.pausasDigitais,
  );
  const digital = history.filter(
    (item) => item.pausasDigitais > item.pausasAnalogicas,
  );
  if (analog.length < 2 || digital.length < 2) return null;
  const avgAnalog = average(
    analog.map((item) => overloadScale[item.sobrecarga] ?? 1),
  );
  const avgDigital = average(
    digital.map((item) => overloadScale[item.sobrecarga] ?? 1),
  );
  if (avgDigital - avgAnalog >= 0.5) {
    return {
      level: "info",
      icon: "⏸",
      title: "Pausas analógicas × sobrecarga",
      msg: "Mais pausas fora da tela costumam acompanhar menos sobrecarga.",
      tag: "Cruzamento",
    };
  }
  return null;
}

// Detecta tendência recente de esgotamento mental.
// Gera alertas preventivos quando padrões críticos aparecem.
function insightTendenciaSobrecarga(history) {
  const recent = history.slice(-5);
  const overloaded = recent.filter(
    (item) => item.sobrecarga === "limite" || item.sobrecarga === "esgotado",
  );
  if (overloaded.length >= 3) {
    return {
      level: "bad",
      icon: "⚠",
      title: "Tendência de sobrecarga",
      msg: `Você esteve no limite/esgotado em ${overloaded.length} dos últimos ${recent.length} dias. Retome a recuperação rapidamente.`,
      tag: "Alerta preventivo",
    };
  }
  return null;
}

// Função central das análises comportamentais.
// Executa todos os cruzamentos inteligentes do sistema.
function buildBehavioralInsights(history) {
  if (!hasMinimumHistory(history)) return [];
  return [
    insightTelaDesconforto(history),
    insightTelaAntesSono(history),
    insightSonoDisposicao(history),
    insightPausasSobrecarga(history),
    insightTendenciaSobrecarga(history),
  ].filter(Boolean);
}

// Organiza o histórico em formato adequado para gráficos.
// Converte datas e scores em pontos visuais.
function getTrendPoints(history) {
  return history
    .slice()
    .sort((a, b) => new Date(a.reportedAt) - new Date(b.reportedAt))
    .map((entry) => ({
      label: new Date(entry.reportedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      score: entry.score,
    }));
}

// Converte pontuações internas em porcentagens.
// Utilizado em gráficos radar e indicadores visuais.
function getRadarRatios(parts, maxParts) {
  return Object.keys(parts).map((key) =>
    Math.round((parts[key] / maxParts[key]) * 100),
  );
}

// Formata datas ISO para exibição amigável no dashboard.
function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Regra de negócio principal do MVP.
// Permite apenas 1 relatório a cada 16 horas.
function isReportAllowed(lastReportAt, now = new Date()) {
  if (!lastReportAt) return true;
  const last = new Date(lastReportAt);
  const elapsed = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
  return elapsed >= 16;
}

// Calcula quando o próximo relatório poderá ser enviado.
function nextReportAllowed(lastReportAt) {
  if (!lastReportAt) return null;
  const next = new Date(lastReportAt);
  next.setHours(next.getHours() + 16);
  return next;
}

// Cria histórico fictício para demonstração do sistema.
// Simula dados vindos de um banco de dados real.
function createMockHistory() {
  return [
    {
      id: "hist_001",
      userId: "user_001",
      reportedAt: makeIsoTimestamp(7, 18, 20),
      horasTela: 5.8,
      telasAntesDormir: "sim",
      pausasAnalogicas: 2,
      pausasDigitais: 3,
      horasSono: 6,
      qualidadeSono: "media",
      sobrecarga: "controle",
      disposicao: "normal",
      atividade: "ate30",
      desconforto: "moderado",
    },
    {
      id: "hist_002",
      userId: "user_001",
      reportedAt: makeIsoTimestamp(6, 11, 15),
      horasTela: 4.3,
      telasAntesDormir: "nao",
      pausasAnalogicas: 6,
      pausasDigitais: 0,
      horasSono: 8.5,
      qualidadeSono: "muitoboa",
      sobrecarga: "tranquilo",
      disposicao: "muitoalta",
      atividade: "mais1h",
      desconforto: "nenhum",
    },
    {
      id: "hist_003",
      userId: "user_001",
      reportedAt: makeIsoTimestamp(5, 20, 10),
      horasTela: 7,
      telasAntesDormir: "nao",
      pausasAnalogicas: 3,
      pausasDigitais: 1,
      horasSono: 7.2,
      qualidadeSono: "boa",
      sobrecarga: "controle",
      disposicao: "alta",
      atividade: "mais1h",
      desconforto: "leve",
    },
    {
      id: "hist_004",
      userId: "user_001",
      reportedAt: makeIsoTimestamp(4, 9, 40),
      horasTela: 9.1,
      telasAntesDormir: "sim",
      pausasAnalogicas: 1,
      pausasDigitais: 2,
      horasSono: 5.5,
      qualidadeSono: "ruim",
      sobrecarga: "limite",
      disposicao: "baixa",
      atividade: "ate30",
      desconforto: "moderado",
    },
    {
      id: "hist_005",
      userId: "user_001",
      reportedAt: makeIsoTimestamp(3, 17, 50),
      horasTela: 6.5,
      telasAntesDormir: "nao",
      pausasAnalogicas: 4,
      pausasDigitais: 2,
      horasSono: 7.5,
      qualidadeSono: "boa",
      sobrecarga: "controle",
      disposicao: "alta",
      atividade: "30a60",
      desconforto: "leve",
    },
    {
      id: "hist_006",
      userId: "user_001",
      reportedAt: makeIsoTimestamp(2, 20, 30),
      horasTela: 8.2,
      telasAntesDormir: "sim",
      pausasAnalogicas: 2,
      pausasDigitais: 3,
      horasSono: 6,
      qualidadeSono: "media",
      sobrecarga: "limite",
      disposicao: "normal",
      atividade: "ate30",
      desconforto: "moderado",
    },
    {
      id: "hist_007",
      userId: "user_001",
      reportedAt: makeIsoTimestamp(1, 18, 20),
      horasTela: 6.5,
      telasAntesDormir: "nao",
      pausasAnalogicas: 4,
      pausasDigitais: 1,
      horasSono: 7.8,
      qualidadeSono: "boa",
      sobrecarga: "controle",
      disposicao: "alta",
      atividade: "30a60",
      desconforto: "leve",
    },
  ].map((entry) => ({ ...entry, score: scoreBalance(entry).score }));
}

// Histórico mockado utilizado temporariamente durante o desenvolvimento.
const MOCK_HISTORY = createMockHistory();

// Simulação temporária de camada de banco de dados.
// Estruturada para facilitar futura substituição por API real.
const mockDatabase = {
  readHistory: async () => {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return [...MOCK_HISTORY].sort(
      (a, b) => new Date(b.reportedAt) - new Date(a.reportedAt),
    );
  },
  saveReport: async (record) => {
    await new Promise((resolve) => setTimeout(resolve, 120));
    MOCK_HISTORY.unshift(record);
    return [...MOCK_HISTORY].sort(
      (a, b) => new Date(b.reportedAt) - new Date(a.reportedAt),
    );
  },
};

// Define estado visual das métricas do dashboard.
// Retorna status como ok, warn ou bad.
function metricState(type, value) {
  if (type === "tela") return value <= 6 ? "ok" : value <= 8 ? "warn" : "bad";
  if (type === "pausas") return value >= 3 ? "ok" : value >= 1 ? "warn" : "bad";
  if (type === "sono") return value >= 18 ? "ok" : value >= 12 ? "warn" : "bad";
  if (type === "sobrecarga")
    return value === "controle" || value === "tranquilo"
      ? "ok"
      : value === "limite"
        ? "warn"
        : "bad";
  return "ok";
}

// Retorna descrições textuais auxiliares para cada métrica.
function metricCaption(type, value) {
  if (type === "tela") {
    if (value <= 4) return "Dentro do ideal";
    if (value <= 6) return "Equilibrado";
    if (value <= 8) return "Acumulando desgaste";
    return "Exposição elevada";
  }
  if (type === "pausas") {
    if (value >= 5) return "Excelente cadência";
    if (value >= 3) return "Boa cadência";
    if (value >= 1) return "Pode aumentar";
    return "Nenhuma pausa real";
  }
  if (type === "sono") return "Sono e qualidade combinados";
  if (type === "sobrecarga") {
    if (value === "tranquilo") return "Estado mental saudável";
    if (value === "controle") return "Sob gestão";
    if (value === "limite") return "Risco de esgotamento";
    return "Recuperação urgente";
  }
  return "";
}

// Componente principal do dashboard.
// Centraliza estados, análises, histórico,
// regras de negócio e renderização da interface.
function Dashboard() {
  const [history, setHistory] = useState([]);
  const [formState, dispatch] = useReducer(formReducer, defaultForm);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: "idle", text: "" });

  // Carrega o histórico inicial da aplicação.
  // Simula leitura assíncrona de banco de dados.
  useEffect(() => {
    let mounted = true;
    mockDatabase.readHistory().then((records) => {
      if (!mounted) return;
      setHistory(records);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Mantém o histórico sempre ordenado do mais recente para o mais antigo.
  const sortedHistory = useMemo(
    () =>
      [...history].sort(
        (a, b) => new Date(b.reportedAt) - new Date(a.reportedAt),
      ),
    [history],
  );

  // Recupera o relatório mais recente do usuário.
  const latestReport = sortedHistory[0] ?? null;

  // Verifica se um novo relatório pode ser enviado,
  // aplicando a regra das 16 horas.
  const reportAllowed = useMemo(
    () => isReportAllowed(latestReport?.reportedAt),
    [latestReport],
  );

  // Calcula quando o próximo relatório será liberado.
  const nextAllowedAt = useMemo(
    () => (latestReport ? nextReportAllowed(latestReport.reportedAt) : null),
    [latestReport],
  );

  // Executa análise completa do formulário atual em tempo real.
  const analysis = useMemo(() => scoreBalance(formState), [formState]);

  // Determina classificação textual do score atual.
  const band = useMemo(() => classifyBand(analysis.score), [analysis.score]);

  // Verifica se já existem dados suficientes
  // para liberar análises comportamentais avançadas.
  const enoughHistory = useMemo(
    () => hasMinimumHistory(sortedHistory),
    [sortedHistory],
  );

  // Prepara dados históricos para gráficos de tendência.
  const trendData = useMemo(
    () => getTrendPoints(sortedHistory),
    [sortedHistory],
  );

  // Gera porcentagens utilizadas em gráficos radar.
  const radarRatios = useMemo(
    () => getRadarRatios(analysis.parts, analysis.maxParts),
    [analysis.parts, analysis.maxParts],
  );

  // Executa os cruzamentos comportamentais personalizados.
  const behavioralInsights = useMemo(
    () => buildBehavioralInsights(sortedHistory),
    [sortedHistory],
  );

  // Gera recomendações automáticas com base nos hábitos atuais do usuário.
  const recommendations = useMemo(() => {
    const recs = [];
    if (analysis.parts.pTela <= 10)
      recs.push(
        "Aplique a regra 20-20-20: a cada 20 minutos olhe para algo a 6m por 20s.",
      );
    if (analysis.parts.pPausas <= 8)
      recs.push(
        "Programe pausas curtas fora da tela a cada bloco de trabalho.",
      );
    if (formState.telasAntesDormir === "sim")
      recs.push("Crie uma rotina de desaceleração 30 min antes do sono.");
    if (analysis.parts.pSonoHoras < 15 || analysis.parts.pSonoQual < 8)
      recs.push("Estabeleça horários regulares de sono.");
    if (
      formState.sobrecarga === "limite" ||
      formState.sobrecarga === "esgotado"
    )
      recs.push("Reserve intervalos de recuperação mental durante o dia.");
    if (
      formState.desconforto === "moderado" ||
      formState.desconforto === "intenso"
    )
      recs.push(
        "Reveja sua ergonomia de trabalho e levante-se a cada 50 minutos.",
      );
    if (!recs.length)
      recs.push("Mantenha o registro diário para fortalecer seu histórico.");
    return recs.slice(0, 4);
  }, [analysis.parts, formState]);

  // Estrutura os cards principais de métricas do dashboard.
  const metricCards = [
    {
      key: "tela",
      title: "Tempo de tela",
      value: analysis.raw.horasTela.toFixed(1),
      unit: "h",
      state: metricState("tela", analysis.raw.horasTela),
      fill: Math.min(100, (analysis.raw.horasTela / 12) * 100),
      caption: metricCaption("tela", analysis.raw.horasTela),
    },
    {
      key: "pausas",
      title: "Pausas reais",
      value: analysis.raw.pausasAnalogicas,
      unit: "pausas",
      state: metricState("pausas", analysis.raw.pausasAnalogicas),
      fill: Math.min(100, (analysis.raw.pausasAnalogicas / 6) * 100),
      caption: metricCaption("pausas", analysis.raw.pausasAnalogicas),
    },
    {
      key: "sono",
      title: "Sono",
      value: analysis.raw.horasSono.toFixed(1),
      unit: "h",
      state: metricState(
        "sono",
        analysis.parts.pSonoHoras + analysis.parts.pSonoQual,
      ),
      fill: ((analysis.parts.pSonoHoras + analysis.parts.pSonoQual) / 25) * 100,
      caption: metricCaption("sono", analysis.raw.horasSono),
    },
    {
      key: "sobrecarga",
      title: "Sobrecarga",
      value:
        formState.sobrecarga === "tranquilo"
          ? "Tranquilo"
          : formState.sobrecarga === "controle"
            ? "Sob controle"
            : formState.sobrecarga === "limite"
              ? "No limite"
              : "Esgotado",
      unit: "",
      state: metricState("sobrecarga", formState.sobrecarga),
      fill:
        formState.sobrecarga === "tranquilo"
          ? 100
          : formState.sobrecarga === "controle"
            ? 75
            : formState.sobrecarga === "limite"
              ? 35
              : 10,
      caption: metricCaption("sobrecarga", formState.sobrecarga),
    },
  ];

  // Responsável por registrar um novo relatório.
  // Aplica validações, calcula score e atualiza histórico.
  const submitReport = async () => {
    if (!reportAllowed) {
      setStatus({
        type: "error",
        text: `Apenas um novo relatório a cada 16h. Próximo permitido em ${formatDateTime(nextAllowedAt.toISOString())}.`,
      });
      return;
    }

    const record = {
      id: `report_${Date.now()}`,
      userId: "user_001",
      reportedAt: new Date().toISOString(),
      ...formState,
    };
    record.score = scoreBalance(record).score;

    setStatus({ type: "pending", text: "Registrando relatório..." });
    const updated = await mockDatabase.saveReport(record);
    setHistory(updated);
    setStatus({ type: "success", text: "Relatório registrado com sucesso." });
  };

  // Estado visual exibido enquanto os dados são carregados.
  if (loading) {
    return (
      <main className="dashboard-shell">
        <div className="loading-state">Carregando painel...</div>
      </main>
    );
  }

  return (
    <main className="dashboard-shell">
      <div className="dash-head">
        <div>
          <h1>Painel de equilíbrio digital</h1>
          <p>
            Registre sua rotina digital com dados reais. O painel organiza
            Score, recomendações e sinais comportamentais, preparado para
            integração com backend.
          </p>
        </div>
        <div className="dash-pill-group">
          <span className="dash-pill">
            Histórico: {sortedHistory.length} dias
          </span>
          <span className="dash-pill">
            Análises completas: {enoughHistory ? "Sim" : "Não"}
          </span>
          <span className="dash-pill">
            Último relatório:{" "}
            {latestReport ? formatDateTime(latestReport.reportedAt) : "Nenhum"}
          </span>
        </div>
      </div>

      <div className="dash-grid">
        <aside className="form-panel">
          <h2>Registro de hoje</h2>
          <p className="form-panel__sub">
            Dados de rotina são a base para uma análise consistente. Atualize o
            painel quando precisar.
          </p>

          <div className="field">
            <div className="field__row">
              <label htmlFor="horasTela">Horas de tela</label>
              <span>{formState.horasTela}</span>
            </div>
            <input
              id="horasTela"
              type="number"
              min={0}
              max={14}
              step={0.5}
              value={formState.horasTela}
              onChange={(event) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "horasTela",
                  value: Number(event.target.value),
                })
              }
            />
          </div>

          <div className="field">
            <p>Usou telas na última hora antes de dormir?</p>
            <div className="toggle-grid">
              {[
                { value: "sim", label: "Sim" },
                { value: "nao", label: "Não" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`toggle-btn ${formState.telasAntesDormir === option.value ? "active" : ""}`}
                  onClick={() =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "telasAntesDormir",
                      value: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field__row">
              <label htmlFor="pausasAnalogicas">Pausas fora da tela</label>
              <span>{formState.pausasAnalogicas}</span>
            </div>
            <input
              id="pausasAnalogicas"
              type="number"
              min={0}
              max={10}
              step={1}
              value={formState.pausasAnalogicas}
              onChange={(event) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "pausasAnalogicas",
                  value: Number(event.target.value),
                })
              }
            />
          </div>

          <div className="field">
            <div className="field__row">
              <label htmlFor="pausasDigitais">Pausas com celular</label>
              <span>{formState.pausasDigitais}</span>
            </div>
            <input
              id="pausasDigitais"
              type="number"
              min={0}
              max={10}
              step={1}
              value={formState.pausasDigitais}
              onChange={(event) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "pausasDigitais",
                  value: Number(event.target.value),
                })
              }
            />
          </div>

          <div className="field">
            <div className="field__row">
              <label htmlFor="horasSono">Horas dormidas</label>
              <span>{formState.horasSono}</span>
            </div>
            <input
              id="horasSono"
              type="number"
              min={0}
              max={12}
              step={0.5}
              value={formState.horasSono}
              onChange={(event) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "horasSono",
                  value: Number(event.target.value),
                })
              }
            />
          </div>

          <div className="field">
            <p>Qualidade do sono</p>
            <div className="toggle-grid toggle-grid--5">
              {[
                { value: "muitoboa", label: "Muito boa" },
                { value: "boa", label: "Boa" },
                { value: "media", label: "Média" },
                { value: "ruim", label: "Ruim" },
                { value: "muitoruim", label: "Muito ruim" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`toggle-btn ${formState.qualidadeSono === option.value ? "active" : ""}`}
                  onClick={() =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "qualidadeSono",
                      value: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <p>Estado mental</p>
            <div className="toggle-grid toggle-grid--4">
              {[
                { value: "tranquilo", label: "Tranquilo" },
                { value: "controle", label: "Sob controle" },
                { value: "limite", label: "No limite" },
                { value: "esgotado", label: "Esgotado" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`toggle-btn ${formState.sobrecarga === option.value ? "active" : ""}`}
                  onClick={() =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "sobrecarga",
                      value: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <p>Disposição</p>
            <div className="toggle-grid toggle-grid--5">
              {[
                { value: "muitoalta", label: "Muito alta" },
                { value: "alta", label: "Alta" },
                { value: "normal", label: "Normal" },
                { value: "baixa", label: "Baixa" },
                { value: "muitobaixa", label: "Muito baixa" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`toggle-btn ${formState.disposicao === option.value ? "active" : ""}`}
                  onClick={() =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "disposicao",
                      value: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <p>Atividade física</p>
            <div className="toggle-grid toggle-grid--4">
              {[
                { value: "mais1h", label: "Mais de 1h" },
                { value: "30a60", label: "30–60 min" },
                { value: "ate30", label: "Até 30 min" },
                { value: "nenhuma", label: "Não pratiquei" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`toggle-btn ${formState.atividade === option.value ? "active" : ""}`}
                  onClick={() =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "atividade",
                      value: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <p>Desconforto físico</p>
            <div className="toggle-grid toggle-grid--4">
              {[
                { value: "nenhum", label: "Nenhum" },
                { value: "leve", label: "Leve" },
                { value: "moderado", label: "Moderado" },
                { value: "intenso", label: "Intenso" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`toggle-btn ${formState.desconforto === option.value ? "active" : ""}`}
                  onClick={() =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "desconforto",
                      value: option.value,
                    })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn--primary"
            type="button"
            onClick={submitReport}
          >
            Analisar meu dia
            <span className="btn__arrow">→</span>
          </button>

          {status.type !== "idle" && (
            <div
              className={`alert ${status.type === "error" ? "alert--bad" : status.type === "pending" ? "alert--info" : "alert--warn"}`}
            >
              <div className="alert__icon">i</div>
              <div className="alert__body">
                <div className="alert__title">Status</div>
                <p className="alert__msg">{status.text}</p>
              </div>
            </div>
          )}
        </aside>

        <section className="dash-panel">
          <div className={`risk-hero risk-hero--${band}`}>
            <div>
              <span className="risk-status">{BAND_INFO[band].label}</span>
              <h2>Seu Score de Equilíbrio Digital</h2>
              <p>{BAND_INFO[band].desc}</p>
            </div>
            <div className="gauge">
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <circle className="gauge__track" cx="100" cy="100" r="84" />
                <circle
                  className="gauge__fill"
                  cx="100"
                  cy="100"
                  r="84"
                  strokeDasharray={2 * Math.PI * 84}
                  strokeDashoffset={
                    2 * Math.PI * 84 * (1 - analysis.score / 100)
                  }
                />
              </svg>
              <div className="gauge__value">
                <div className="gauge__num">{analysis.score}</div>
                <div className="gauge__lbl">Equilíbrio / 100</div>
              </div>
            </div>
          </div>

          <div className="metric-grid">
            {metricCards.map((metric) => (
              <article
                className="metric"
                key={metric.key}
                data-state={metric.state}
              >
                <div className="metric__head">
                  <span className="metric__title">{metric.title}</span>
                  <span className="metric__state">{metric.state}</span>
                </div>
                <div className="metric__num">
                  <strong>{metric.value}</strong>
                  <small>{metric.unit}</small>
                </div>
                <div className="metric__bar">
                  <div
                    className="metric__bar-fill"
                    style={{ width: `${metric.fill}%` }}
                  />
                </div>
                <p className="metric__caption">{metric.caption}</p>
              </article>
            ))}
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card__head">
                <div>
                  <h3>Tendência semanal</h3>
                  <p>Score de equilíbrio dos últimos 7 dias</p>
                </div>
              </div>
              <div className="chart-canvas">
                <TrendChart points={trendData} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card__head">
                <div>
                  <h3>Análise por dimensão</h3>
                  <p>Percentual do máximo atual</p>
                </div>
              </div>
              <div className="chart-canvas chart-canvas--small">
                <RadarChart ratios={radarRatios} />
              </div>
            </div>
          </div>

          <div className="alerts-section">
            <div className="alerts__head">
              <h3>Análises comportamentais</h3>
              <span>{behavioralInsights.length} sinais</span>
            </div>
            <p className="alerts__note">
              {enoughHistory
                ? "Insights cruzam seu histórico completo."
                : `Registre 7 dias para análises avançadas. Atualmente: ${sortedHistory.length}.`}
            </p>
            <div className="alert-list">
              {behavioralInsights.map((item, index) => (
                <div
                  className={`alert ${item.level === "bad" ? "alert--bad" : item.level === "warn" ? "alert--warn" : "alert--info"}`}
                  key={index}
                >
                  <div className="alert__icon">{item.icon}</div>
                  <div className="alert__body">
                    <strong className="alert__title">{item.title}</strong>
                    <p className="alert__msg">{item.msg}</p>
                    <span className="alert__tag">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="recommendations">
            <h3>Recomendações práticas</h3>
            <div className="reco-list">
              {recommendations.map((item, index) => (
                <div className="reco-item" key={index}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="disclaimer">
            <span>i</span>
            <p>
              O painel está arquitetado para conexão com backend e gravação de
              histórico persistente. Não substitui avaliação profissional.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function TrendChart({ points }) {
  const width = 520;
  const height = 220;
  const padding = 24;
  const maxScore = 100;
  const step =
    points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

  const path = points
    .map((point, index) => {
      const x = padding + index * step;
      const y =
        height - padding - (point.score / maxScore) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Gráfico de tendência"
      role="img"
    >
      <path
        d={path}
        fill="none"
        stroke="var(--vital)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {points.map((point, index) => {
        const x = padding + index * step;
        const y =
          height - padding - (point.score / maxScore) * (height - padding * 2);
        return (
          <circle key={point.label} cx={x} cy={y} r="4" fill="var(--vital)" />
        );
      })}
      {points.map((point, index) => {
        const x = padding + index * step;
        return (
          <text
            key={`lbl-${index}`}
            x={x}
            y={height - padding + 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-muted)"
          >
            {point.label}
          </text>
        );
      })}
    </svg>
  );
}

function RadarChart({ ratios }) {
  const size = 260;
  const center = size / 2;
  const radius = 92;
  const labels = ["Tela", "Antes", "Pausas", "Sono", "Qualidade", "Mental"];
  const points = ratios.map((ratio, index) => {
    const angle = (Math.PI * 2 * index) / ratios.length - Math.PI / 2;
    return {
      x: center + (Math.cos(angle) * (radius * ratio)) / 100,
      y: center + (Math.sin(angle) * (radius * ratio)) / 100,
      label: labels[index],
      angle,
    };
  });
  const polygon =
    points
      .map((pt, index) => `${index === 0 ? "M" : "L"} ${pt.x} ${pt.y}`)
      .join(" ") + " Z";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} aria-label="Gráfico radar" role="img">
      {[0.25, 0.5, 0.75, 1].map((factor) => (
        <circle
          key={factor}
          cx={center}
          cy={center}
          r={radius * factor}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
        />
      ))}
      <path
        d={polygon}
        fill="rgba(77,212,172,0.18)"
        stroke="var(--vital)"
        strokeWidth="2"
      />
      {points.map((pt, idx) => (
        <circle
          key={`dot-${idx}`}
          cx={pt.x}
          cy={pt.y}
          r="4"
          fill="var(--vital)"
        />
      ))}
      {points.map((pt, index) => {
        const labelX = center + Math.cos(pt.angle) * (radius + 22);
        const labelY = center + Math.sin(pt.angle) * (radius + 22);
        return (
          <text
            key={`label-${index}`}
            x={labelX}
            y={labelY}
            textAnchor={
              Math.abs(Math.cos(pt.angle)) < 0.3
                ? "middle"
                : pt.x > center
                  ? "start"
                  : "end"
            }
            fontSize="10"
            fill="var(--text-muted)"
          >
            {pt.label}
          </text>
        );
      })}
    </svg>
  );
}

export default Dashboard;
