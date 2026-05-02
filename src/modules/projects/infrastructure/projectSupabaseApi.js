import {
  fetchProjectsApi,
  getProjectApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from '../../../core/infrastructure/supabaseRestApi';

export const fetchProjects = async (userId, accessToken) => {
  if (!userId) return [];
  try {
    return await fetchProjectsApi(userId, accessToken) || [];
  } catch (err) {
    console.error("Erro ao buscar projetos:", err);
    return [];
  }
};

export const deleteProject = async (id, userId, accessToken) => {
  await deleteProjectApi(id, userId, accessToken);
};

export const getProject = async (id, userId, accessToken) => {
  const data = await getProjectApi(id, userId, accessToken);
  if (!data) throw new Error("Projeto não encontrado.");
  return data;
};

export const updateProject = async (id, userId, updates, accessToken) => {
  const data = await updateProjectApi(id, userId, updates, accessToken);
  return data;
};

export const createProject = async (projectData, accessToken) => {
  const data = await createProjectApi(projectData, accessToken);
  return data;
};
