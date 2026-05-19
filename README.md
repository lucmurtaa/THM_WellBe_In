
# Wellbe-in

"A tecnologia para o bem."

## Visão Geral

Wellbe-in é um sistema de monitoramento comportamental focado no desgaste digital. Por meio de um formulário diário simples, o sistema coleta hábitos do usuário (horas de tela, pausas, sono, sobrecarga mental, disposição, desconfortos físicos e hábitos de recuperação) e gera indicadores, gráficos e insights preventivos. O sistema não realiza diagnósticos médicos.

## Objetivos

- Promover rotinas digitais mais saudáveis
- Incentivar equilíbrio entre produtividade e recuperação
- Reduzir impactos do excesso de tempo de tela
- Identificar sinais recorrentes de desgaste físico e mental
- Gerar conscientização sobre hábitos digitais

## Público-alvo

- Programadores e profissionais digitais
- Estudantes (principalmente EAD)
- Pessoas em Home Office
- Gamers
- Usuários com alta exposição diária a telas

## Como funciona (visão geral)

1. Coleta de dados por formulário diário
2. Processamento e geração do Score de Equilíbrio Digital
3. Análises comportamentais personalizadas (a partir de 7 dias de uso)

## Score de Equilíbrio Digital (0–100)

O score principal avalia o equilíbrio da rotina do usuário com base em fatores diretamente ligados ao desgaste digital: horas de tela, pausas, sono, uso de telas antes de dormir e percepção de sobrecarga.

Pontuação resumida por fator:

- Horas de tela:
	- 0–4h: +25 pontos
	- 4–6h: +18 pontos
	- 6–8h: +10 pontos
	- >8h: 0 pontos
- Uso de telas antes de dormir:
	- Não: +10 pontos
	- Sim: 0 pontos
- Qualidade das pausas (pausas fora das telas):
	- 5+ pausas: +20 pontos
	- 3–4 pausas: +15 pontos
	- 1–2 pausas: +8 pontos
	- Nenhuma: 0 pontos
- Sono:
	- Horas:
		- 7–9h: +15 pontos
		- 6h: +10 pontos
		- 5h: +5 pontos
		- <5h: 0 pontos
	- Qualidade:
		- Muito boa: +10 pontos
		- Boa: +8 pontos
		- Média: +5 pontos
		- Ruim: +2 pontos
		- Muito ruim: 0 pontos
- Sobrecarga mental:
	- Tranquilo: +20 pontos
	- Sob controle: +15 pontos
	- No limite: +5 pontos
	- Esgotado: 0 pontos

Score de Desgaste Digital = 100 − Score de Equilíbrio Digital

Classificações (exemplo):

- 80–100: Rotina equilibrada
- 60–79: Atenção
- 40–59: Desgaste moderado
- 0–39: Alto desgaste

## Dados complementares

Algumas informações são usadas nas análises, mas não entram diretamente no cálculo principal do score:

- Disposição/energia (Muito alta, Alta, Normal, Baixa, Muito baixa)
- Atividade física (Mais de 1h, 30–60 min, Até 30 min, Não pratiquei)
- Desconforto físico (Nenhum, Leve, Moderado, Intenso)

## Análises comportamentais (MVP)

Funcionalidades de análise previstas para o MVP:

1. Horas de tela × Desconforto físico — identificar correlações entre tempo de tela e dores/tensões
2. Uso de tela antes de dormir × Qualidade do sono — analisar impacto na recuperação
3. Sono × Disposição — relacionar recuperação com energia diária
4. Tipo de pausa × Sobrecarga mental — comparar pausas analógicas vs digitais
5. Tendência semanal de sobrecarga — alertas quando há recorrência de estados "No limite" ou "Esgotado"

Observação: análises avançadas começam após 7 dias de dados.

## Regras de negócio

- Dias sem preenchimento não são usados em médias e análises históricas
- Gráficos e scores estão disponíveis desde o primeiro registro
- Análises comportamentais avançadas exigem no mínimo 7 dias de uso
- O sistema não realiza diagnósticos médicos nem usa IA para fins clínicos

## Estrutura do dashboard (front-end)

Componentes principais:

- Cards de destaque (Score de Equilíbrio, Score de Desgaste)
- Painel diário com: horas de tela, pausas, sono, sobrecarga, disposição
- Área de gráficos (evolução semanal, comparações, tendências)
- Feed de insights personalizados (ex.: "Seu sono tende a piorar quando há uso de telas antes de dormir")

## Diferencial do projeto

Wellbe-in foca em:

- Interpretar padrões individuais
- Detectar mudanças de comportamento ao longo do tempo
- Relacionar hábitos digitais com desgaste físico e mental
- Gerar conscientização personalizada baseada no histórico do usuário

---

# React + Vite

Este repositório usa o template React + Vite. Mantive a seção informativa do template original para referência do ambiente de desenvolvimento.

Plugins oficiais disponíveis:

- @vitejs/plugin-react (usa Oxc)
- @vitejs/plugin-react-swc (usa SWC)

Para desenvolvimentos de produção, considere usar TypeScript e regras de lint com type-aware (`typescript-eslint`).

