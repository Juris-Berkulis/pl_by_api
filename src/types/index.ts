type ProjectStatus = 'CREATED' | 'IN_PROGRESS' | 'FINISHED';

export interface Project {
    id: number,
    title: string,
    status: ProjectStatus,
};
