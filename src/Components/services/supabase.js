// Arquivo inteiramente "mockado" (simulado) para que não dê erro na Vercel
// Agora que não estamos mais usando o Supabase no MVP!

export const supabase = {
    from: () => ({
        select: () => ({
            eq: () => ({
                single: () => ({ data: null, error: null })
            }),
            order: () => ({ data: [], error: null })
        }),
        insert: () => ({ data: null, error: null }),
        update: () => ({
            eq: () => ({ select: () => ({ data: null, error: null }) })
        }),
        delete: () => ({
            eq: () => ({ data: null, error: null })
        })
    })
};

export const fetchProjects = async () => {
    return [];
};

export const deleteProject = async (id) => {
    return;
};

export const getProject = async (id) => {
    return {};
};

export const updateProject = async (id, projectData) => {
    return [];
};
