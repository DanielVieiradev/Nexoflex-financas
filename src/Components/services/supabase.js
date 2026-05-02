
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

export const deleteProject = async () => {
    return;
};

export const getProject = async () => {
    return {};
};

export const updateProject = async () => {
    return [];
};
