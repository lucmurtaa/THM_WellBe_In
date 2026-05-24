-- ============================================================
-- WellBe-In — Schema do Banco de Dados
-- Plataforma: Supabase (PostgreSQL)
--
-- Este arquivo contém a definição completa do banco:
--   • Tabelas (perfis, registros_diarios, insights_gerados)
--   • Constraints, índices, checks
--   • Triggers de atualização automática
--   • Row Level Security (RLS)
--
-- Convenção de nomenclatura:
--   - snake_case para colunas e tabelas
--   - Nomes dos campos textuais em português (domínio da aplicação)
--   - CHECK constraints listam valores válidos explicitamente
--
-- Histórico:
--   2026-05-23 — Schema inicial (MVP)
-- ============================================================

-- ============================================================
-- EXTENSÕES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABELAS
-- ============================================================

-- ----------------------------------------------------------
-- perfis
-- Vincula cada usuário do Supabase Auth (auth.users) a um
-- perfil de aplicação. A trigger on_auth_user_created cria
-- automaticamente um registro nesta tabela no momento do
-- cadastro.
-- ----------------------------------------------------------
CREATE TABLE perfis (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id    uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome            varchar(255) NOT NULL,
  username        varchar(100) UNIQUE NOT NULL,
  avatar_url      varchar(500),
  timezone        varchar(50) DEFAULT 'America/Sao_Paulo',
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ----------------------------------------------------------
-- registros_diarios
-- Armazena o formulário diário do usuário.
-- Cada perfil pode ter NO MÁXIMO um registro por data
-- (garantido pela UNIQUE (perfil_id, data_registro)).
--
-- score_equilibrio  → calculado no front-end (0–100)
-- score_desgaste    → coluna gerada: 100 - score_equilibrio
-- ----------------------------------------------------------
CREATE TABLE registros_diarios (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  perfil_id               uuid NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
  data_registro           date NOT NULL DEFAULT CURRENT_DATE,
  horas_tela              decimal(4,1) NOT NULL CHECK (horas_tela >= 0 AND horas_tela <= 24),
  usou_tela_antes_dormir  boolean NOT NULL,
  pausas_analogicas       integer NOT NULL CHECK (pausas_analogicas >= 0),
  pausas_digitais         integer NOT NULL CHECK (pausas_digitais >= 0),
  horas_sono              decimal(3,1) NOT NULL CHECK (horas_sono >= 0 AND horas_sono <= 24),
  qualidade_sono          varchar(20) NOT NULL CHECK (qualidade_sono IN ('muitoboa','boa','media','ruim','muitoruim')),
  sobrecarga              varchar(20) NOT NULL CHECK (sobrecarga IN ('tranquilo','controle','limite','esgotado')),
  disposicao              varchar(20) NOT NULL CHECK (disposicao IN ('muitoalta','alta','normal','baixa','muitobaixa')),
  atividade_fisica        varchar(20) NOT NULL CHECK (atividade_fisica IN ('mais1h','30a60','ate30','nenhuma')),
  desconforto_fisico      varchar(20) NOT NULL CHECK (desconforto_fisico IN ('nenhum','leve','moderado','intenso')),
  score_equilibrio        integer NOT NULL CHECK (score_equilibrio >= 0 AND score_equilibrio <= 100),
  score_desgaste          integer GENERATED ALWAYS AS (100 - score_equilibrio) STORED,
  observacoes             text,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now(),

  -- Garante UM registro por dia por perfil
  UNIQUE (perfil_id, data_registro)
);

-- ----------------------------------------------------------
-- insights_gerados
-- Insights comportamentais gerados pelo cruzamento dos dados
-- do histórico do usuário (após 7+ dias de registros).
-- ----------------------------------------------------------
CREATE TABLE insights_gerados (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  perfil_id           uuid NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
  registro_diario_id  uuid REFERENCES registros_diarios(id) ON DELETE SET NULL,
  tipo_insight        varchar(50) NOT NULL,
  mensagem            text NOT NULL,
  relevancia          integer CHECK (relevancia >= 1 AND relevancia <= 5),
  created_at          timestamptz DEFAULT now()
);

-- ============================================================
-- ÍNDICES
-- ============================================================

-- Índice composto para consultas do dashboard (ordenado por data)
CREATE INDEX idx_registros_perfil_data
  ON registros_diarios(perfil_id, data_registro DESC);

-- Índices para JOINs frequentes
CREATE INDEX idx_registros_perfil
  ON registros_diarios(perfil_id);

CREATE INDEX idx_insights_perfil
  ON insights_gerados(perfil_id);

CREATE INDEX idx_insights_registro
  ON insights_gerados(registro_diario_id);

-- ============================================================
-- TRIGGER: updated_at automático
-- ============================================================

CREATE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_updated_at_perfis
  BEFORE UPDATE ON perfis
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_registros
  BEFORE UPDATE ON registros_diarios
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- TRIGGER: Criação automática de perfil no cadastro
--
-- Quando um usuário se registra via Supabase Auth,
-- esta função insere automaticamente um registro na
-- tabela `perfis` vinculado ao auth_user_id recém-criado.
-- ============================================================

CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.perfis (id, auth_user_id, nome, username)
  VALUES (
    gen_random_uuid(),
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'nome', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
--
-- Garante que cada usuário autenticado veja e manipule
-- APENAS seus próprios dados.
-- auth.uid() retorna o ID do auth.users da sessão atual.
-- ============================================================

ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE registros_diarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights_gerados ENABLE ROW LEVEL SECURITY;

-- Políticas: perfis
CREATE POLICY "Usuários podem ver próprio perfil"
  ON perfis FOR SELECT
  USING (auth_user_id = auth.uid());

CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON perfis FOR UPDATE
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "Usuários podem inserir próprio perfil"
  ON perfis FOR INSERT
  WITH CHECK (auth_user_id = auth.uid());

-- Nota: DELETE em perfis não é permitido via RLS.
-- A exclusão ocorre por CASCADE quando o usuário exclui a conta no Supabase Auth.

-- Políticas: registros_diarios
CREATE POLICY "Usuários veem próprios registros"
  ON registros_diarios FOR SELECT
  USING (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()));

CREATE POLICY "Usuários inserem próprios registros"
  ON registros_diarios FOR INSERT
  WITH CHECK (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()));

CREATE POLICY "Usuários atualizam próprios registros"
  ON registros_diarios FOR UPDATE
  USING (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()))
  WITH CHECK (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()));

CREATE POLICY "Usuários deletam próprios registros"
  ON registros_diarios FOR DELETE
  USING (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()));

-- Políticas: insights_gerados
CREATE POLICY "Usuários veem próprios insights"
  ON insights_gerados FOR SELECT
  USING (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()));

CREATE POLICY "Usuários inserem próprios insights"
  ON insights_gerados FOR INSERT
  WITH CHECK (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()));

CREATE POLICY "Usuários deletam próprios insights"
  ON insights_gerados FOR DELETE
  USING (perfil_id IN (SELECT id FROM perfis WHERE auth_user_id = auth.uid()));
