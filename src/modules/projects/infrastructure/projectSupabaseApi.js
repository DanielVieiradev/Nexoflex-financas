import { supabase } from '../../../core/infrastructure/supabaseClient';

export const fetchProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
  return data || [];
};

export const deleteProject = async (id) => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) {
    console.error("Erro ao deletar projeto:", error);
    throw error;
  }
};

export const getProject = async (id) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error("Erro ao buscar projeto:", error);
    throw error;
  }
  return data;
};

export const updateProject = async (id, updates) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw error;
  }
  return data;
};

export const createProject = async (projectData) => {
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
