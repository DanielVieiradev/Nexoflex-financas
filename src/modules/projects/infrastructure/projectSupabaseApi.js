import { supabase } from '../../../core/infrastructure/supabaseClient';

export const fetchProjects = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase.from('projects').select('*').eq('user_id', userId);
  if (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
  return data || [];
};

export const deleteProject = async (id, userId) => {
  const { error } = await supabase.from('projects').delete().eq('id', id).eq('user_id', userId);
  if (error) {
    console.error("Erro ao deletar projeto:", error);
    throw error;
  }
};

export const getProject = async (id, userId) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error("Erro ao buscar projeto:", error);
    throw error;
  }
  return data;
};

export const updateProject = async (id, userId, updates) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw error;
  }
  return data;
};

export const createProject = async (projectData) => {
  // O backend RLS também protegerá, mas é ideal que o caller envie o user_id.
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar projeto:", error);
    throw error;
  }
  return data;
};
