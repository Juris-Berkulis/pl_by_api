export type ProjectStatus = 'CREATED' | 'IN_PROGRESS' | 'FINISHED';

export interface Project {
    id: number,
    title: string,
    status: ProjectStatus,
};

export type SelectedProjectStatus = ProjectStatus | 'Любой';
