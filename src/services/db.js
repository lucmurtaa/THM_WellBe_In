import { supabase } from '../lib/supabaseClient'

export const db = {
  getHistory: (perfilId) =>
    supabase
      .from('registros_diarios')
      .select('*')
      .eq('perfil_id', perfilId)
      .order('data_registro', { ascending: false }),

  upsertRecord: (record) =>
    supabase
      .from('registros_diarios')
      .upsert(record, { onConflict: 'perfil_id, data_registro' })
      .select()
      .single(),

  getLatestRecord: (perfilId) =>
    supabase
      .from('registros_diarios')
      .select('*')
      .eq('perfil_id', perfilId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),

  countRecords: (perfilId) =>
    supabase
      .from('registros_diarios')
      .select('id', { count: 'exact', head: true })
      .eq('perfil_id', perfilId),

  getTrendData: (perfilId) =>
    supabase
      .from('registros_diarios')
      .select('data_registro, score_equilibrio')
      .eq('perfil_id', perfilId)
      .order('data_registro', { ascending: true }),

  getInsights: (perfilId) =>
    supabase
      .from('insights_gerados')
      .select('*')
      .eq('perfil_id', perfilId)
      .order('created_at', { ascending: false }),

  saveInsight: (insight) =>
    supabase
      .from('insights_gerados')
      .insert(insight)
      .select()
      .single(),
}
