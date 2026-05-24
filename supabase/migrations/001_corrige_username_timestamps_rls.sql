-- ============================================================
-- Migration 001: Corrige username, timestamps e RLS
--
-- 1. Remove UNIQUE do username (usado apenas para exibição)
-- 2. Remove INSERT público em insights_gerados
--    (backend gera insights via service_role)
-- 3. Adiciona NOT NULL nos timestamps
-- ============================================================

-- 1. Remove UNIQUE constraint do username
ALTER TABLE perfis DROP CONSTRAINT IF EXISTS perfis_username_key;

-- 2. Remove INSERT policy pública de insights_gerados
DROP POLICY IF EXISTS "Usuários inserem próprios insights" ON insights_gerados;

-- 3. Adiciona NOT NULL nos timestamps
UPDATE perfis SET created_at = now() WHERE created_at IS NULL;
UPDATE perfis SET updated_at = now() WHERE updated_at IS NULL;
UPDATE registros_diarios SET created_at = now() WHERE created_at IS NULL;
UPDATE registros_diarios SET updated_at = now() WHERE updated_at IS NULL;
UPDATE insights_gerados SET created_at = now() WHERE created_at IS NULL;

ALTER TABLE perfis ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE perfis ALTER COLUMN updated_at SET NOT NULL;
ALTER TABLE registros_diarios ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE registros_diarios ALTER COLUMN updated_at SET NOT NULL;
ALTER TABLE insights_gerados ALTER COLUMN created_at SET NOT NULL;
