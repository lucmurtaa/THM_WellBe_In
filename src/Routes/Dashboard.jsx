import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [horasTela, setHorasTela] = useState(6);
  const [telasAntesDormir, setTelasAntesDormir] = useState("nao");
  const [pausasAnalogicas, setPausasAnalogicas] = useState(3);
  const [pausasDigitais, setPausasDigitais] = useState(2);
  const [horasSono, setHorasSono] = useState(7);
  const [qualidadeSono, setQualidadeSono] = useState("boa");
  const [sobrecarga, setSobrecarga] = useState("controle");
  const [disposicao, setDisposicao] = useState("normal");
  const [atividade, setAtividade] = useState("ate30");
  const [desconforto, setDesconforto] = useState("nenhum");

  // Helpers: history storage
  const STORE_KEY = "wellbein_history";

  const $ = (sel) => document.querySelector(sel);

  function loadHistory() {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    const labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const seed = labels.map((day, i) => ({
      day,
      score: 55 + Math.round(Math.random() * 30),
      horasTela: 4 + Math.random() * 6,
      telasAntesDormir: Math.random() < 0.45 ? "sim" : "nao",
      pausasAnalogicas: Math.floor(Math.random() * 5),
      pausasDigitais: Math.floor(Math.random() * 4),
      horasSono: 5.5 + Math.random() * 3,
      qualidadeSono: ["muitoboa", "boa", "media", "ruim"][
        Math.floor(Math.random() * 4)
      ],
      sobrecarga: ["tranquilo", "controle", "limite", "esgotado"][
        Math.floor(Math.random() * 4)
      ],
      disposicao: ["muitoalta", "alta", "normal", "baixa", "muitobaixa"][
        Math.floor(Math.random() * 5)
      ],
      desconforto: ["nenhum", "leve", "moderado", "intenso"][
        Math.floor(Math.random() * 4)
      ],
    }));
    return seed;
  }

  function pushHistory(score, d) {
    const hist = loadHistory();
    const today = "Hoje";
    const filtered = hist.filter((h) => h.day !== today);
    const trimmed = filtered.slice(-6);
    trimmed.push({
      day: today,
      score,
      horasTela: d.horasTela,
      telasAntesDormir: d.telasAntesDormir,
      pausasAnalogicas: d.pausasAnalogicas,
      pausasDigitais: d.pausasDigitais,
      horasSono: d.horasSono,
      qualidadeSono: d.qualidadeSono,
      sobrecarga: d.sobrecarga,
      disposicao: d.disposicao,
      desconforto: d.desconforto,
    });
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(trimmed));
    } catch (_) {}
    return trimmed;
  }

  // Scoring and helpers (ported)
  function scoreBalance(d) {
    let pTela;
    if (d.horasTela <= 4) pTela = 25;
    else if (d.horasTela <= 6) pTela = 18;
    else if (d.horasTela <= 8) pTela = 10;
    else pTela = 0;

    const pAntesDormir = d.telasAntesDormir === "nao" ? 10 : 0;

    let pPausas;
    if (d.pausasAnalogicas >= 5) pPausas = 20;
    else if (d.pausasAnalogicas >= 3) pPausas = 15;
    else if (d.pausasAnalogicas >= 1) pPausas = 8;
    else pPausas = 0;

    let pSonoHoras;
    if (d.horasSono >= 7 && d.horasSono <= 9) pSonoHoras = 15;
    else if (Math.floor(d.horasSono) === 6) pSonoHoras = 10;
    else if (Math.floor(d.horasSono) === 5) pSonoHoras = 5;
    else pSonoHoras = 0;

    const qualMap = { muitoboa: 10, boa: 8, media: 5, ruim: 2, muitoruim: 0 };
    const pSonoQual = qualMap[d.qualidadeSono] ?? 5;

    const sobMap = { tranquilo: 20, controle: 15, limite: 5, esgotado: 0 };
    const pSobrecarga = sobMap[d.sobrecarga] ?? 10;

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
      raw: d,
    };
  }

  function band(score) {
    if (score >= 80) return "equilibrada";
    if (score >= 60) return "atencao";
    if (score >= 40) return "moderado";
    return "alto";
  }

  const BAND_INFO = {
    equilibrada: {
      label: "Rotina equilibrada",
      desc: "Seus indicadores estão dentro de faixas saudáveis. A rotina digital de hoje favorece a sua recuperação física e mental — mantenha a consistência.",
    },
    atencao: {
      label: "Atenção",
      desc: "Alguns sinais de fadiga começam a aparecer. Pequenos ajustes hoje evitam que esses padrões se acumulem ao longo da semana.",
    },
    moderado: {
      label: "Desgaste moderado",
      desc: "Múltiplas dimensões estão fora do ideal. Reduzir o tempo de tela e melhorar a recuperação são prioridades para os próximos dias.",
    },
    alto: {
      label: "Alto desgaste",
      desc: "Sua rotina mostra sinais consistentes de sobrecarga digital. Considere uma desconexão real e priorize sono, pausas analógicas e atividade física.",
    },
  };

  // DOM-updating helpers (imperative, quick port)
  function updateGauge(balance) {
    const circle = document.getElementById("gaugeFill");
    if (!circle) return;
    const r = +circle.getAttribute("r");
    const circumference = 2 * Math.PI * r;
    circle.setAttribute("stroke-dasharray", circumference);
    const offset = circumference * (1 - balance / 100);
    circle.setAttribute("stroke-dashoffset", offset);
    const num = document.getElementById("gaugeNum");
    if (num) num.textContent = balance;
  }

  function setMetric(id, value, unit, state, barPct, caption) {
    const card = document.getElementById(id);
    if (!card) return;
    card.dataset.state = state;
    const valEl = card.querySelector(".metric__num-val");
    if (valEl) valEl.textContent = value;
    const unitEl = card.querySelector(".metric__num-unit");
    if (unitEl) unitEl.textContent = unit;
    const bar = card.querySelector(".metric__bar-fill");
    if (bar) bar.style.width = `${barPct}%`;
    const cap = card.querySelector(".metric__caption");
    if (cap) cap.textContent = caption;
  }

  function updateMetrics(d, parts, maxParts) {
    setMetric(
      "metricTela",
      d.horasTela.toFixed(1),
      "h",
      telaState(d.horasTela),
      Math.min(100, (d.horasTela / 12) * 100),
      telaCaption(d.horasTela),
    );
    setMetric(
      "metricPausas",
      d.pausasAnalogicas,
      "pausas",
      pausaState(d.pausasAnalogicas),
      Math.min(100, (d.pausasAnalogicas / 6) * 100),
      pausaCaption(d.pausasAnalogicas),
    );
    const sonoSubScore = parts.pSonoHoras + parts.pSonoQual;
    setMetric(
      "metricSono",
      d.horasSono.toFixed(1),
      "h",
      sonoState(sonoSubScore),
      (sonoSubScore / 25) * 100,
      sonoCaption(d.horasSono, d.qualidadeSono),
    );
    setMetric(
      "metricSobrecarga",
      sobrecargaLabel(d.sobrecarga),
      "",
      sobrecargaState(d.sobrecarga),
      sobrecargaPct(d.sobrecarga),
      sobrecargaCaption(d.sobrecarga),
    );
  }

  // State helpers copied
  const telaState = (h) => (h <= 6 ? "ok" : h <= 8 ? "warn" : "bad");
  const telaCaption = (h) =>
    h <= 4
      ? "Dentro do ideal"
      : h <= 6
        ? "Equilibrado"
        : h <= 8
          ? "Acumulando desgaste"
          : "Exposição elevada";
  const pausaState = (p) =>
    p >= 5 ? "ok" : p >= 3 ? "ok" : p >= 1 ? "warn" : "bad";
  const pausaCaption = (p) =>
    p >= 5
      ? "Excelente cadência"
      : p >= 3
        ? "Boa cadência"
        : p >= 1
          ? "Pode aumentar"
          : "Nenhuma pausa real";
  const sonoState = (s) => (s >= 18 ? "ok" : s >= 12 ? "warn" : "bad");
  const sonoCaption = (h, q) => {
    const tagH =
      h >= 7 && h <= 9
        ? "duração ideal"
        : h >= 6
          ? "duração curta"
          : "duração insuficiente";
    const tagQ =
      {
        muitoboa: "qualidade ótima",
        boa: "qualidade boa",
        media: "qualidade média",
        ruim: "qualidade ruim",
        muitoruim: "qualidade péssima",
      }[q] || "";
    return `${tagH} · ${tagQ}`;
  };

  const sobrecargaLabel = (s) =>
    ({
      tranquilo: "Tranquilo",
      controle: "Sob controle",
      limite: "No limite",
      esgotado: "Esgotado",
    })[s] || "—";
  const sobrecargaState = (s) =>
    s === "tranquilo" || s === "controle"
      ? "ok"
      : s === "limite"
        ? "warn"
        : "bad";
  const sobrecargaPct = (s) =>
    ({ tranquilo: 100, controle: 75, limite: 35, esgotado: 10 })[s] || 50;
  const sobrecargaCaption = (s) =>
    ({
      tranquilo: "Estado mental saudável",
      controle: "Sob gestão",
      limite: "Risco de esgotamento",
      esgotado: "Recuperação urgente",
    })[s] || "";

  // Insights/rendering (kept imperative for speed)
  function renderAlerts(list) {
    const container = document.getElementById("alertList");
    const count = document.getElementById("alertCount");
    const note = document.getElementById("alertsNote");
    const hist = loadHistory();
    if (!container) return;
    container.innerHTML = "";
    list.forEach((a) => {
      const lvl =
        a.level === "bad"
          ? "alert--bad"
          : a.level === "warn"
            ? "alert--warn"
            : a.level === "info"
              ? "alert--info"
              : "";
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="alert ${lvl}">
          <div class="alert__icon">${a.icon}</div>
          <div class="alert__body">
            <div class="alert__title">${a.title}</div>
            <p class="alert__msg">${a.msg}</p>
            <span class="alert__tag">${a.tag}</span>
          </div>
        </div>
      `,
      );
    });
    if (count) count.textContent = `${list.length} sinais`;
    if (note) {
      note.textContent =
        hist.length >= 7
          ? "Análises cruzando seu histórico completo (≥7 dias)."
          : `Insights baseados no dia de hoje. Análises comportamentais avançadas aparecem a partir de 7 dias de registro (${hist.length}/7).`;
    }
  }

  function generateRecommendations(d, parts) {
    const recs = [];
    if (parts.pTela <= 10)
      recs.push(
        "Aplique a regra 20-20-20: a cada 20 minutos olhe para algo a 6m por 20s.",
      );
    if (parts.pPausas <= 8)
      recs.push("Programe 5 pausas curtas fora da tela (2-3 min).");
    if (d.telasAntesDormir === "sim")
      recs.push('Crie uma rotina de "wind-down" 30 min antes de dormir.');
    if (parts.pSonoHoras < 15 || parts.pSonoQual < 8)
      recs.push("Estabeleça horário fixo para dormir e acordar.");
    if (d.sobrecarga === "limite" || d.sobrecarga === "esgotado")
      recs.push("Pratique 5 minutos de respiração 4-7-8 duas vezes ao dia.");
    if (d.atividade === "nenhuma" || d.atividade === "ate30")
      recs.push("Inclua ao menos 30 min de movimento diário.");
    if (d.desconforto === "moderado" || d.desconforto === "intenso")
      recs.push(
        "Faça uma checagem ergonômica: monitor na linha dos olhos, pés no chão.",
      );
    if (recs.length === 0) {
      recs.push("Mantenha a consistência: registre seus dados diariamente.");
      recs.push('Experimente "pausas de janela" — 1 minuto entre tarefas.');
    }
    const top = recs.slice(0, 4);
    const list = document.getElementById("recoList");
    if (!list) return;
    list.innerHTML = top
      .map(
        (r, i) =>
          `<div class="reco-item"><div class="reco-item__num">${i + 1}</div><div>${r}</div></div>`,
      )
      .join("");
  }

  // Charts (uses global Chart if present) — adjusted to use --vital/--accent-purple
  let trendChart = null;
  let breakdownChart = null;
  function buildCharts(history, parts, maxParts) {
    const days = history.map((h) => h.day);
    const scores = history.map((h) => h.score);
    const trendCtx = document.getElementById("trendChart");
    const breakdownCtx = document.getElementById("breakdownChart");
    if (!trendCtx || !breakdownCtx || typeof Chart === "undefined") return;
    const css = getComputedStyle(document.documentElement);
    const cBalance = css.getPropertyValue("--vital").trim() || "#4DD4AC";
    const cFatigue =
      css.getPropertyValue("--accent-purple").trim() || "#FFB785";
    const cBgBase = css.getPropertyValue("--bg-base").trim() || "#0B100F";
    const cMuted = css.getPropertyValue("--text-muted").trim() || "#6E7773";
    Chart.defaults.color = cMuted;
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.borderColor = "rgba(255,255,255,0.06)";
    if (trendChart) trendChart.destroy();
    trendChart = new Chart(trendCtx, {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Equilíbrio diário",
            data: scores,
            borderColor: cBalance,
            borderWidth: 2.5,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: cBalance,
            pointBorderColor: cBgBase,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            fill: true,
            backgroundColor: (ctx) => {
              const chart = ctx.chart;
              const { ctx: c, chartArea } = chart;
              if (!chartArea) return null;
              const grad = c.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom,
              );
              grad.addColorStop(0, "rgba(77, 212, 172, 0.35)");
              grad.addColorStop(1, "rgba(77, 212, 172, 0)");
              return grad;
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1B2220",
            borderColor: "#272F2C",
            borderWidth: 1,
            padding: 12,
            titleFont: { size: 12, weight: "500" },
            bodyFont: { size: 13 },
            cornerRadius: 8,
            displayColors: false,
            callbacks: { label: (ctx) => `Equilíbrio: ${ctx.parsed.y}/100` },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: { stepSize: 25, font: { size: 11 } },
          },
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        },
      },
    });
    if (breakdownChart) breakdownChart.destroy();
    breakdownChart = new Chart(breakdownCtx, {
      type: "radar",
      data: {
        labels: [
          "Tela",
          "Antes de dormir",
          "Pausas",
          "Horas de sono",
          "Qualidade sono",
          "Estado mental",
        ],
        datasets: [
          {
            label: "% do máximo",
            data: [
              (parts.pTela / maxParts.pTela) * 100,
              (parts.pAntesDormir / maxParts.pAntesDormir) * 100,
              (parts.pPausas / maxParts.pPausas) * 100,
              (parts.pSonoHoras / maxParts.pSonoHoras) * 100,
              (parts.pSonoQual / maxParts.pSonoQual) * 100,
              (parts.pSobrecarga / maxParts.pSobrecarga) * 100,
            ],
            backgroundColor: "rgba(77,212,172,0.18)",
            borderColor: cBalance,
            borderWidth: 2,
            pointBackgroundColor: cBalance,
            pointBorderColor: cBgBase,
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1B2220",
            borderColor: "#272F2C",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => `${ctx.label}: ${Math.round(ctx.parsed.r)}%`,
            },
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            angleLines: { color: "rgba(255,255,255,0.06)" },
            grid: { color: "rgba(255,255,255,0.06)" },
            pointLabels: {
              font: {
                size: 10,
                weight: "500",
                family: "'Inter', system-ui, sans-serif",
              },
              color: cMuted,
            },
            ticks: { display: false, stepSize: 25 },
          },
        },
      },
    });
  }

  // Insights helpers used in daily/cross analyses
  const mean = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  const desconfortoScale = { nenhum: 0, leve: 1, moderado: 2, intenso: 3 };
  const disposicaoScale = {
    muitoalta: 4,
    alta: 3,
    normal: 2,
    baixa: 1,
    muitobaixa: 0,
  };
  const qualidadeScale = {
    muitoboa: 4,
    boa: 3,
    media: 2,
    ruim: 1,
    muitoruim: 0,
  };
  const sobrecargaScale = { tranquilo: 0, controle: 1, limite: 2, esgotado: 3 };

  function insightTelaDesconforto(hist) {
    const altaTela = hist.filter((h) => h.horasTela > 8);
    const baixaTela = hist.filter((h) => h.horasTela <= 6);
    if (altaTela.length < 2 || baixaTela.length < 2) return null;
    const mAlta = mean(
      altaTela.map((h) => desconfortoScale[h.desconforto] || 0),
    );
    const mBaixa = mean(
      baixaTela.map((h) => desconfortoScale[h.desconforto] || 0),
    );
    if (mAlta - mBaixa >= 0.6)
      return {
        level: "warn",
        icon: "⌨",
        title: "Tela × desconforto físico",
        msg: "Você tende a sentir mais desconforto físico em dias acima de 8 horas de tela. Considere alongamentos a cada 60-90 minutos e ajustes ergonômicos.",
        tag: "Cruzamento",
      };
    return null;
  }
  function insightTelaAntesSono(hist) {
    const comTela = hist.filter((h) => h.telasAntesDormir === "sim");
    const semTela = hist.filter((h) => h.telasAntesDormir === "nao");
    if (comTela.length < 2 || semTela.length < 2) return null;
    const mCom = mean(comTela.map((h) => qualidadeScale[h.qualidadeSono] || 2));
    const mSem = mean(semTela.map((h) => qualidadeScale[h.qualidadeSono] || 2));
    if (mSem - mCom >= 0.5)
      return {
        level: "info",
        icon: "🌙",
        title: "Telas antes de dormir × qualidade do sono",
        msg: "Nos dias em que você evita telas antes de dormir, sua qualidade de sono tende a melhorar.",
        tag: "Cruzamento",
      };
    return null;
  }
  function insightSonoDisposicao(hist) {
    const longo = hist.filter((h) => h.horasSono >= 7);
    const curto = hist.filter((h) => h.horasSono < 6);
    if (longo.length < 2 || curto.length < 2) return null;
    const mLongo = mean(longo.map((h) => disposicaoScale[h.disposicao] || 2));
    const mCurto = mean(curto.map((h) => disposicaoScale[h.disposicao] || 2));
    if (mLongo - mCurto >= 0.6)
      return {
        level: "ok",
        icon: "☀",
        title: "Sono × disposição",
        msg: "Sua disposição costuma ser maior em dias com mais de 7 horas de sono. A consistência do horário de dormir potencializa esse efeito.",
        tag: "Cruzamento",
      };
    return null;
  }
  function insightPausaSobrecarga(hist) {
    const altaAnalog = hist.filter(
      (h) => (h.pausasAnalogicas || 0) > (h.pausasDigitais || 0),
    );
    const altaDigital = hist.filter(
      (h) => (h.pausasDigitais || 0) > (h.pausasAnalogicas || 0),
    );
    if (altaAnalog.length < 2 || altaDigital.length < 2) return null;
    const mAna = mean(
      altaAnalog.map((h) => sobrecargaScale[h.sobrecarga] || 1),
    );
    const mDig = mean(
      altaDigital.map((h) => sobrecargaScale[h.sobrecarga] || 1),
    );
    if (mDig - mAna >= 0.5)
      return {
        level: "info",
        icon: "⏸",
        title: "Pausas analógicas × sobrecarga",
        msg: "Nos dias com mais pausas fora das telas, você tende a terminar o dia menos sobrecarregado.",
        tag: "Cruzamento",
      };
    return null;
  }
  function insightTendenciaSobrecarga(hist) {
    const recents = hist.slice(-5);
    const heavy = recents.filter(
      (h) => h.sobrecarga === "limite" || h.sobrecarga === "esgotado",
    );
    if (heavy.length >= 3)
      return {
        level: "bad",
        icon: "⚠",
        title: "Tendência semanal de sobrecarga",
        msg: `Você registrou estado "no limite" ou "esgotado" em ${heavy.length} dos últimos ${recents.length} dias. Esse padrão prolongado merece atenção e descanso real.`,
        tag: "Alerta preventivo",
      };
    return null;
  }

  function dailyInsights(d, parts, maxParts) {
    const out = [];
    if (parts.pTela <= 10) {
      out.push({
        level: d.horasTela > 8 ? "bad" : "warn",
        icon: "⌨",
        title: "Exposição digital elevada",
        msg: `Você passou ${d.horasTela.toFixed(1)} horas em frente a telas hoje. Exposições acima de 8h estão associadas a fadiga visual.`,
        tag: "Hoje",
      });
    }
    if (d.telasAntesDormir === "sim")
      out.push({
        level: "info",
        icon: "🌙",
        title: "Tela na última hora antes de dormir",
        msg: "A luz azul e o conteúdo estimulante atrasam a produção de melatonina.",
        tag: "Hoje",
      });
    if (parts.pPausas <= 8)
      out.push({
        level: d.pausasAnalogicas === 0 ? "bad" : "warn",
        icon: "⏸",
        title: "Pausas analógicas insuficientes",
        msg: `Apenas ${d.pausasAnalogicas} pausa(s) fora das telas hoje.`,
        tag: "Hoje",
      });
    if (parts.pSonoHoras + parts.pSonoQual <= 12)
      out.push({
        level: d.horasSono < 6 ? "bad" : "warn",
        icon: "😴",
        title: "Recuperação incompleta",
        msg: `Você dormiu ${d.horasSono.toFixed(1)}h com qualidade ${{ muitoboa: "muito boa", boa: "boa", media: "média", ruim: "ruim", muitoruim: "muito ruim" }[d.qualidadeSono]}.`,
        tag: "Hoje",
      });
    if (d.sobrecarga === "limite" || d.sobrecarga === "esgotado")
      out.push({
        level: d.sobrecarga === "esgotado" ? "bad" : "warn",
        icon: "⚡",
        title: "Estado mental sob pressão",
        msg: `Você registrou "${sobrecargaLabel(d.sobrecarga).toLowerCase()}" hoje. Respiração consciente ajuda.`,
        tag: "Hoje",
      });
    if (d.desconforto === "moderado" || d.desconforto === "intenso")
      out.push({
        level: d.desconforto === "intenso" ? "bad" : "warn",
        icon: "🦴",
        title: "Desconforto físico relevante",
        msg: "Tensão muscular costuma acompanhar dias de tela longa.",
        tag: "Hoje",
      });
    return out;
  }

  function buildInsights(d, parts, maxParts, hist) {
    const insights = dailyInsights(d, parts, maxParts);
    if (hist.length >= 7) {
      [
        insightTelaDesconforto,
        insightTelaAntesSono,
        insightSonoDisposicao,
        insightPausaSobrecarga,
        insightTendenciaSobrecarga,
      ].forEach((fn) => {
        const r = fn(hist);
        if (r) insights.push(r);
      });
    }
    if (insights.length === 0)
      insights.push({
        level: "ok",
        icon: "✓",
        title: "Dia equilibrado",
        msg: "Seus indicadores estão saudáveis. Mantenha o registro diário.",
        tag: "Status",
      });
    return insights;
  }

  // Main analyze (reads React state)
  function analyze() {
    const d = {
      horasTela: Number(horasTela),
      telasAntesDormir,
      pausasAnalogicas: Number(pausasAnalogicas),
      pausasDigitais: Number(pausasDigitais),
      horasSono: Number(horasSono),
      qualidadeSono,
      sobrecarga,
      disposicao,
      atividade,
      desconforto,
    };
    const result = scoreBalance(d);
    const equilibrio = result.score;
    const desgaste = 100 - equilibrio;
    const b = band(equilibrio);
    const hero = document.getElementById("riskHero");
    if (hero) hero.dataset.band = b;
    const status = document.getElementById("riskStatus");
    if (status) status.textContent = BAND_INFO[b].label;
    const msg = document.getElementById("riskMessage");
    if (msg) msg.textContent = BAND_INFO[b].desc;
    const bal = document.getElementById("balanceVal");
    if (bal) bal.textContent = equilibrio;
    const fat = document.getElementById("fatigueVal");
    if (fat) fat.textContent = desgaste;
    updateGauge(equilibrio);
    updateMetrics(d, result.parts, result.maxParts);
    const hist = pushHistory(equilibrio, d);
    const insights = buildInsights(d, result.parts, result.maxParts, hist);
    renderAlerts(insights);
    generateRecommendations(d, result.parts);
    buildCharts(hist, result.parts, result.maxParts);
    const t = new Date();
    const tStr = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
    const pill = document.getElementById("lastUpdate");
    if (pill) pill.textContent = `Última análise · ${tStr}`;
  }

  useEffect(() => {
    // initial run after mount
    const id = setTimeout(() => {
      analyze();
    }, 120);
    return () => clearTimeout(id);
  }, []);

  // resize charts
  useEffect(() => {
    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.trendChart)
          window.trendChart.resize && window.trendChart.resize();
      }, 150);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <main className="dashboard-shell">
        <div className="dash-head">
          <div className="dash-head__left">
            <h1>Painel de equilíbrio digital</h1>
            <p>
              Registre os indicadores da sua rotina digital à esquerda. Seu
              Score de Equilíbrio e a análise comportamental atualizam em tempo
              real.
            </p>
          </div>
        </div>

        {/* ===== Two-column layout ===== */}
        <div className="dash-grid">
          {/* ===== LEFT: Form ===== */}
          <aside className="form-panel">
            <h2>Registro do dia</h2>
            <p className="form-panel__sub">
              Responda sobre sua rotina e clique em Analisar.
            </p>

            {/* ROTINA DIGITAL */}
            <div className="form-group">
              <div className="form-group__label">Rotina digital</div>

              <div className="field">
                <div className="field__row">
                  <label htmlFor="horasTela">Horas de tela hoje</label>
                  <span className="field__val" data-out="horasTela">
                    {horasTela}
                  </span>
                </div>
                <input
                  type="number"
                  id="horasTela"
                  min={0}
                  max={14}
                  step={0.5}
                  value={horasTela}
                  onChange={(e) => setHorasTela(Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label style={{ display: "block", marginBottom: "0.6rem" }}>
                  Usou telas na última hora antes de dormir?
                </label>
                <div className="toggle-grid" data-group="telasAntesDormir">
                  <button
                    type="button"
                    className={`toggle-btn ${telasAntesDormir === "sim" ? "active" : ""}`}
                    onClick={() => setTelasAntesDormir("sim")}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${telasAntesDormir === "nao" ? "active" : ""}`}
                    onClick={() => setTelasAntesDormir("nao")}
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>

            {/* PAUSAS */}
            <div className="form-group">
              <div className="form-group__label">Pausas durante o dia</div>

              <div className="field">
                <div className="field__row">
                  <label htmlFor="pausasAnalogicas">
                    Pausas fora das telas
                  </label>
                  <span className="field__val" data-out="pausasAnalogicas">
                    {pausasAnalogicas}
                  </span>
                </div>
                <input
                  type="number"
                  id="pausasAnalogicas"
                  min={0}
                  max={10}
                  step={1}
                  value={pausasAnalogicas}
                  onChange={(e) => setPausasAnalogicas(Number(e.target.value))}
                />
              </div>

              <div className="field">
                <div className="field__row">
                  <label htmlFor="pausasDigitais">
                    Pausas com celular / redes
                  </label>
                  <span className="field__val" data-out="pausasDigitais">
                    {pausasDigitais}
                  </span>
                </div>
                <input
                  type="number"
                  id="pausasDigitais"
                  min={0}
                  max={10}
                  step={1}
                  value={pausasDigitais}
                  onChange={(e) => setPausasDigitais(Number(e.target.value))}
                />
              </div>
            </div>

            {/* SONO */}
            <div className="form-group">
              <div className="form-group__label">Sono e recuperação</div>

              <div className="field">
                <div className="field__row">
                  <label htmlFor="horasSono">Horas dormidas</label>
                  <span className="field__val" data-out="horasSono">
                    {horasSono}
                  </span>
                </div>
                <input
                  type="number"
                  id="horasSono"
                  min={0}
                  max={12}
                  step={0.5}
                  value={horasSono}
                  onChange={(e) => setHorasSono(Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label style={{ display: "block", marginBottom: "0.6rem" }}>
                  Qualidade do sono
                </label>
                <div
                  className="toggle-grid toggle-grid--5"
                  data-group="qualidadeSono"
                >
                  <button
                    type="button"
                    className={`toggle-btn ${qualidadeSono === "muitoboa" ? "active" : ""}`}
                    onClick={() => setQualidadeSono("muitoboa")}
                  >
                    Muito boa
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${qualidadeSono === "boa" ? "active" : ""}`}
                    onClick={() => setQualidadeSono("boa")}
                  >
                    Boa
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${qualidadeSono === "media" ? "active" : ""}`}
                    onClick={() => setQualidadeSono("media")}
                  >
                    Média
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${qualidadeSono === "ruim" ? "active" : ""}`}
                    onClick={() => setQualidadeSono("ruim")}
                  >
                    Ruim
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${qualidadeSono === "muitoruim" ? "active" : ""}`}
                    onClick={() => setQualidadeSono("muitoruim")}
                  >
                    Muito ruim
                  </button>
                </div>
              </div>
            </div>

            {/* ESTADO MENTAL */}
            <div className="form-group">
              <div className="form-group__label">Estado mental</div>

              <div className="field">
                <label style={{ display: "block", marginBottom: "0.6rem" }}>
                  Em qual nível você se sentiu mentalmente?
                </label>
                <div
                  className="toggle-grid toggle-grid--4"
                  data-group="sobrecarga"
                >
                  <button
                    type="button"
                    className={`toggle-btn ${sobrecarga === "tranquilo" ? "active" : ""}`}
                    onClick={() => setSobrecarga("tranquilo")}
                  >
                    Tranquilo
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${sobrecarga === "controle" ? "active" : ""}`}
                    onClick={() => setSobrecarga("controle")}
                  >
                    Sob controle
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${sobrecarga === "limite" ? "active" : ""}`}
                    onClick={() => setSobrecarga("limite")}
                  >
                    No limite
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${sobrecarga === "esgotado" ? "active" : ""}`}
                    onClick={() => setSobrecarga("esgotado")}
                  >
                    Esgotado
                  </button>
                </div>
              </div>
            </div>

            {/* COMPLEMENTAR */}
            <div className="form-group">
              <div className="form-group__label">Dados complementares</div>

              <div className="field">
                <label style={{ display: "block", marginBottom: "0.6rem" }}>
                  Disposição hoje
                </label>
                <div
                  className="toggle-grid toggle-grid--5"
                  data-group="disposicao"
                >
                  <button
                    type="button"
                    className={`toggle-btn ${disposicao === "muitoalta" ? "active" : ""}`}
                    onClick={() => setDisposicao("muitoalta")}
                  >
                    Muito alta
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${disposicao === "alta" ? "active" : ""}`}
                    onClick={() => setDisposicao("alta")}
                  >
                    Alta
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${disposicao === "normal" ? "active" : ""}`}
                    onClick={() => setDisposicao("normal")}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${disposicao === "baixa" ? "active" : ""}`}
                    onClick={() => setDisposicao("baixa")}
                  >
                    Baixa
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${disposicao === "muitobaixa" ? "active" : ""}`}
                    onClick={() => setDisposicao("muitobaixa")}
                  >
                    Muito baixa
                  </button>
                </div>
              </div>

              <div className="field">
                <label style={{ display: "block", marginBottom: "0.6rem" }}>
                  Atividade física
                </label>
                <div
                  className="toggle-grid toggle-grid--4"
                  data-group="atividade"
                >
                  <button
                    type="button"
                    className={`toggle-btn ${atividade === "mais1h" ? "active" : ""}`}
                    onClick={() => setAtividade("mais1h")}
                  >
                    Mais de 1h
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${atividade === "30a60" ? "active" : ""}`}
                    onClick={() => setAtividade("30a60")}
                  >
                    30–60 min
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${atividade === "ate30" ? "active" : ""}`}
                    onClick={() => setAtividade("ate30")}
                  >
                    Até 30 min
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${atividade === "nenhuma" ? "active" : ""}`}
                    onClick={() => setAtividade("nenhuma")}
                  >
                    Não pratiquei
                  </button>
                </div>
              </div>

              <div className="field">
                <label style={{ display: "block", marginBottom: "0.6rem" }}>
                  Desconforto físico
                </label>
                <div
                  className="toggle-grid toggle-grid--4"
                  data-group="desconforto"
                >
                  <button
                    type="button"
                    className={`toggle-btn ${desconforto === "nenhum" ? "active" : ""}`}
                    onClick={() => setDesconforto("nenhum")}
                  >
                    Nenhum
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${desconforto === "leve" ? "active" : ""}`}
                    onClick={() => setDesconforto("leve")}
                  >
                    Leve
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${desconforto === "moderado" ? "active" : ""}`}
                    onClick={() => setDesconforto("moderado")}
                  >
                    Moderado
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${desconforto === "intenso" ? "active" : ""}`}
                    onClick={() => setDesconforto("intenso")}
                  >
                    Intenso
                  </button>
                </div>
              </div>
            </div>
            <button
              id="analyzeBtn"
              className="btn btn--analyze"
              onClick={analyze}
            >
              Analisar meu dia
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
            </button>
          </aside>

          {/* ===== RIGHT: Dashboard panels ===== */}
          <div className="dash-panel">
            <div className="risk-hero" id="riskHero" data-band="equilibrada">
              <div className="risk-hero__inner">
                <div>
                  <span className="risk-status" id="riskStatus">
                    Rotina equilibrada
                  </span>
                  <h2>Seu Score de Equilíbrio Digital</h2>
                  <p id="riskMessage">
                    Seus indicadores estão dentro de faixas saudáveis. Continue
                    o monitoramento.
                  </p>

                  <div className="dual-score">
                    <div className="dual-score__item">
                      <span className="dual-score__label">Equilíbrio</span>
                      <span className="dual-score__val" id="balanceVal">
                        —
                      </span>
                    </div>
                    <div className="dual-score__divider"></div>
                    <div className="dual-score__item">
                      <span className="dual-score__label">Desgaste</span>
                      <span
                        className="dual-score__val dual-score__val--fatigue"
                        id="fatigueVal"
                      >
                        —
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gauge">
                  <svg viewBox="0 0 200 200">
                    <circle className="gauge__track" cx="100" cy="100" r="84" />
                    <circle
                      id="gaugeFill"
                      className="gauge__fill"
                      cx="100"
                      cy="100"
                      r="84"
                      strokeDasharray="528"
                      strokeDashoffset="528"
                    />
                  </svg>
                  <div className="gauge__value">
                    <div className="gauge__num" id="gaugeNum">
                      —
                    </div>
                    <div className="gauge__lbl">Equilíbrio / 100</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-grid">
              <div className="metric" id="metricTela" data-state="ok">
                <div className="metric__head">
                  <span className="metric__title">Tempo de tela</span>
                  <span className="metric__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </span>
                </div>
                <div className="metric__num">
                  <span className="metric__num-val">—</span>
                  <small className="metric__num-unit"></small>
                </div>
                <div className="metric__bar">
                  <div
                    className="metric__bar-fill"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="metric__caption">—</div>
              </div>

              <div className="metric" id="metricPausas" data-state="ok">
                <div className="metric__head">
                  <span className="metric__title">Pausas reais</span>
                  <span className="metric__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l3 2" />
                    </svg>
                  </span>
                </div>
                <div className="metric__num">
                  <span className="metric__num-val">—</span>
                  <small className="metric__num-unit"></small>
                </div>
                <div className="metric__bar">
                  <div
                    className="metric__bar-fill"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="metric__caption">—</div>
              </div>

              <div className="metric" id="metricSono" data-state="ok">
                <div className="metric__head">
                  <span className="metric__title">Sono</span>
                  <span className="metric__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </span>
                </div>
                <div className="metric__num">
                  <span className="metric__num-val">—</span>
                  <small className="metric__num-unit"></small>
                </div>
                <div className="metric__bar">
                  <div
                    className="metric__bar-fill"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="metric__caption">—</div>
              </div>

              <div className="metric" id="metricSobrecarga" data-state="ok">
                <div className="metric__head">
                  <span className="metric__title">Sobrecarga</span>
                  <span className="metric__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </span>
                </div>
                <div className="metric__num">
                  <span className="metric__num-val">—</span>
                  <small className="metric__num-unit"></small>
                </div>
                <div className="metric__bar">
                  <div
                    className="metric__bar-fill"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="metric__caption">—</div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <div className="chart-card__head">
                  <div>
                    <h3>Tendência semanal</h3>
                    <p>Score de Equilíbrio Digital, últimos 7 dias</p>
                  </div>
                  <div className="chart-card__legend">
                    <span
                      className="legend-dot"
                      style={{ "--swatch": "var(--vital)" }}
                    >
                      Equilíbrio
                    </span>
                  </div>
                </div>
                <div className="chart-canvas">
                  <canvas id="trendChart"></canvas>
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-card__head">
                  <div>
                    <h3>Por dimensão</h3>
                    <p>Pontuação obtida × máxima</p>
                  </div>
                </div>
                <div className="chart-canvas chart-canvas--small">
                  <canvas id="breakdownChart"></canvas>
                </div>
              </div>
            </div>

            <div className="alerts">
              <div className="alerts__head">
                <h3>Análise comportamental</h3>
                <span className="alerts__count" id="alertCount">
                  — sinais
                </span>
              </div>
              <p className="alerts__note" id="alertsNote">
                Insights cruzam seu histórico. Análises personalizadas aparecem
                a partir de 7 dias de uso.
              </p>
              <div className="alert-list" id="alertList"></div>
            </div>

            <div className="reco">
              <h3>Recomendações para os próximos 7 dias</h3>
              <div className="reco-list" id="recoList"></div>
            </div>

            <div className="disclaimer">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <p>
                O Wellbe-in não realiza diagnósticos médicos. Seu objetivo é
                identificar padrões associados ao desgaste digital e incentivar
                hábitos mais saudáveis.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
