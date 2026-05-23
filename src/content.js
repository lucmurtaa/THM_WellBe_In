export const homeFeatures = [
  {
    num: '01',
    title: 'Coleta diária leve',
    icon: '🔒',
    body: 'Um formulário simples sobre tempo de tela, pausas, sono, sobrecarga, disposição e desconforto físico. Menos de um minuto, sem fadiga de questionário.'
  },
  {
    num: '02',
    title: 'Score de Equilíbrio',
    icon: '📈',
    body: 'Cinco dimensões — tela, sono, pausas, antes de dormir, sobrecarga — somam um score de 0 a 100. Quanto maior, mais saudável foi seu dia digital.'
  },
  {
    num: '03',
    title: 'Análise comportamental',
    icon: '🕒',
    body: 'Após 7 dias, o sistema compara seus próprios hábitos ao longo do tempo e identifica cruzamentos — como tela × desconforto, sono × disposição, pausas × sobrecarga.'
  }
];

export const homeAudience = [
  { icon: '⌨', title: 'Programadores', body: 'Quem passa o dia depurando código — e termina o dia depurando o próprio cansaço.' },
  { icon: '🎓', title: 'Estudantes EAD', body: 'Aulas, materiais, provas — tudo no mesmo monitor que também é entretenimento.' },
  { icon: '🏠', title: 'Home office', body: 'Sem deslocamento físico, sem fronteiras claras entre trabalho e descanso.' },
  { icon: '🎮', title: 'Gamers', body: 'Sessões longas exigem recuperação consciente — sono, pausas e movimento.' }
];

export const problemCards = [
  {
    value: '9.3',
    suffix: 'h',
    title: 'Em frente a telas, todo dia',
    body: 'Média diária de exposição digital do brasileiro em 2024, somando trabalho, estudo e entretenimento. Acima de 8h, sintomas físicos e mentais começam a se acumular.',
    source: 'DataReportal · Digital 2024 Brazil'
  },
  {
    value: '68',
    suffix: '%',
    title: 'Fadiga visual digital',
    body: 'Dos usuários que passam mais de 6h em telas relatam ardência ocular, visão embaçada ou dor de cabeça frequente — quadro conhecido como Computer Vision Syndrome.',
    source: 'American Optometric Association'
  },
  {
    value: '2.3',
    suffix: 'x',
    title: 'Mais risco de insônia',
    body: 'O uso de telas na hora anterior ao sono multiplica em mais que o dobro o risco de insônia clínica. A luz azul atrasa a produção de melatonina e o conteúdo estimulante mantém o cérebro em alerta.',
    source: 'Harvard Medical School · Sleep Health'
  },
  {
    value: '41',
    suffix: '%',
    title: 'Burnout em trabalhadores digitais',
    body: 'Dos profissionais em home office relatam sintomas consistentes de esgotamento mental, com a sobreposição constante entre vida pessoal e ambiente digital de trabalho.',
    source: 'Gallup · State of the Global Workplace'
  }
];

export const problemImpacts = [
  {
    icon: '◔',
    title: 'Sintomas normalizados',
    body: 'Ardência nos olhos, tensão cervical, irritabilidade no fim do expediente — vistos como "normais" há tantos anos que deixam de ser percebidos como aviso.'
  },
  {
    icon: '▣',
    title: 'Pausas que não pausam',
    body: 'Trocar um documento por um feed social não descansa o sistema atencional. A maioria das "pausas" do dia digital é apenas mudança de estímulo digital.'
  },
  {
    icon: '✚',
    title: 'Sem comparação consigo mesmo',
    body: 'Recomendações genéricas não capturam o que mudou na sua rotina. O ponto de referência mais útil é o próprio histórico — e ninguém o observa.'
  },
  {
    icon: '◎',
    title: 'Apps que cuidam pouco',
    body: 'A maioria dos aplicativos de bem-estar disputa a mesma atenção que está desgastada. O Wellbe-in usa um formulário curto e devolve o controle ao usuário.'
  }
];

export const solutionPillars = [
  {
    num: 'PILAR 01',
    title: 'Percepção Diária',
    body: 'Formulário rápido com seletores objetivos sobre tempo de tela, qualidade do sono, pausas e cansaço mental. Menos de um minuto.',
    list: ['Horas de tela e uso antes de dormir', 'Pausas analógicas × digitais', 'Horas e qualidade do sono', 'Sobrecarga mental', 'Disposição, atividade física e desconforto']
  },
  {
    num: 'PILAR 02',
    title: 'Índice de Equilíbrio',
    body: 'Análise que interpreta seis dimensões do seu dia digital, gerando um indicador de estabilidade de 0 a 100.',
    list: ['Tela, sono e pausas', 'Telas antes de dormir', 'Sobrecarga mental', 'Classificação por faixas', 'Desgaste digital = 100 − equilíbrio']
  },
  {
    num: 'PILAR 03',
    title: 'Análise de Padrões',
    body: 'Após 7 dias, o sistema cruza seus históricos para identificar sinais persistentes de desgaste e fadiga acumulada.',
    list: ['Tela × desconforto físico', 'Tela antes de dormir × qualidade do sono', 'Sono × disposição', 'Pausas analógicas × sobrecarga', 'Tendência de sobrecarga semanal']
  }
];

export const solutionFlow = [
  { num: '01', icon: '✎', title: 'Preencher', body: 'Você relata sua rotina digital em menos de um minuto.' },
  { num: '02', icon: '∑', title: 'Pontuar', body: 'O sistema calcula seu índice de equilíbrio do dia.' },
  { num: '03', icon: '⇄', title: 'Cruzar', body: 'O histórico é comparado para revelar padrões invisíveis.' },
  { num: '04', icon: '↗', title: 'Agir', body: 'Seu painel sugere pequenos ajustes preventivos para a rotina.' }
];

export const solutionBands = [
  { range: '80–100', title: 'Rotina equilibrada', body: 'Indicadores saudáveis e boa consistência de recuperação.' },
  { range: '60–79', title: 'Atenção', body: 'Pequenos sinais de fadiga começam a aparecer.' },
  { range: '40–59', title: 'Desgaste moderado', body: 'Múltiplas dimensões estão fora do ideal.' },
  { range: '0–39', title: 'Alto desgaste', body: 'A rotina mostra sinais consistentes de sobrecarga digital.' }
];

export const crossInsights = [
  { num: '01', title: 'Horas de tela × desconforto físico', body: 'Nos dias acima de 8 horas de tela, o desconforto físico tende a subir. Alongamentos e ajustes ergonômicos ajudam a reduzir o acúmulo de tensão.', quote: 'Pausar o corpo é uma forma de proteger a atenção.' },
  { num: '02', title: 'Telas antes de dormir × qualidade do sono', body: 'Evitar telas antes de dormir costuma melhorar a qualidade do sono. A exposição à luz azul atrasa a liberação de melatonina.', quote: 'A noite recupera melhor quando o cérebro recebe menos estímulo.' },
  { num: '03', title: 'Sono × disposição', body: 'Mais de 7 horas de sono normalmente se conectam a melhor disposição no dia seguinte.', quote: 'Dormir bem é a base da energia sustentada.' },
  { num: '04', title: 'Pausas analógicas × sobrecarga', body: 'Dias com mais pausas fora das telas costumam terminar com menor sobrecarga mental.', quote: 'Trocar o feed por uma janela faz diferença.' },
  { num: '05', title: 'Tendência semanal de sobrecarga', body: 'Registrar "no limite" ou "esgotado" em vários dias seguidos é um sinal claro de alerta preventivo.', quote: 'Padrão recorrente pede descanso real, não só uma pausa curta.' }
];





export const teamMembers = [
  {
    initials: 'LF',
    name: 'Luis Fernando Santos Araujo',
    role: 'Estudante de Engenharia de Software',
    rm: 'RM 567998',
    body: 'Função em definição conforme o desenvolvimento do projeto.'
  },
  {
    initials: 'JI',
    name: 'José Inácio Freitas da Silva',
    role: 'Estudante de Engenharia de Software',
    rm: 'RM 566678',
    body: 'Função em definição conforme o desenvolvimento do projeto.'
  },
  {
    initials: 'JW',
    name: 'Jefferson Wrasek Galhardo Júnior',
    role: 'Estudante de Engenharia de Software',
    rm: 'RM 567687',
    body: 'Função em definição conforme o desenvolvimento do projeto.'
  },
  {
    initials: 'NC',
    name: 'Nícolas Codognotto',
    role: 'Estudante de Engenharia de Software',
    rm: 'RM 559852',
    body: 'Função em definição conforme o desenvolvimento do projeto.'
  },
  {
    initials: 'LM',
    name: 'Lucas Murta Vargas',
    role: 'Estudante de Engenharia de Software',
    rm: 'RM 568099',
    body: 'Função em definição conforme o desenvolvimento do projeto.'
  }
];

export const techStack = [
  {
    icon: 'H5',
    title: 'HTML5 semântico',
    body: 'Estrutura · Acessibilidade · Organização do conteúdo'
  },
  {
    icon: 'C3',
    title: 'CSS3 moderno',
    body: 'Responsividade · Grid · Flexbox · Variáveis CSS'
  },
  {
    icon: 'JS',
    title: 'JavaScript (ES6+)',
    body: 'Lógica · Interatividade · Manipulação de dados'
  },
  {
    icon: 'RJ',
    title: 'React + Vite',
    body: 'Componentização · Performance · SPA moderna'
  },
  {
    icon: 'DB',
    title: 'Oracle Database',
    body: 'Banco de dados relacional · Persistência de dados · SQL'
  },
  {
    icon: 'SVG',
    title: 'SVG inline',
    body: 'Elementos gráficos · Ícones · Visualização dinâmica'
  },
  {
    icon: 'Git',
    title: 'Git & GitHub',
    body: 'Versionamento · Colaboração · Organização do projeto'
  },
  {
    icon: 'Vc',
    title: 'Vercel',
    body: 'Deploy · Hospedagem · Publicação do sistema'
  }
];

export const phaseCoverage = [
  {
    title: 'Lógica de Programação',
    body: 'Aplicação de estruturas condicionais, funções, operadores e organização lógica das funcionalidades do sistema.'
  },
  {
    title: 'Desenvolvimento Web',
    body: 'Construção da interface utilizando HTML semântico, CSS moderno e JavaScript para interatividade.'
  },
  {
    title: 'Front-end Responsivo',
    body: 'Uso de responsividade e adaptação da interface para diferentes dispositivos.'
  },
  {
    title: 'Programação com JavaScript',
    body: 'Manipulação de eventos, armazenamento de dados temporários e dinamismo da aplicação.'
  },
  {
    title: 'Frameworks Modernos',
    body: 'Utilização do React para componentização, reaproveitamento de código e organização do projeto.'
  },
  {
    title: 'Banco de Dados',
    body: 'Planejamento da integração com Oracle Database para armazenamento e gerenciamento das informações do sistema.'
  },
  {
    title: 'Engenharia de Software',
    body: 'Aplicação de conceitos de organização, modularização, versionamento e desenvolvimento colaborativo.'
  }
];