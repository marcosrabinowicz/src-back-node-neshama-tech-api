import { Project } from '../entities/project.entity';

export interface IProjectRepository {
  create(data: Project): Promise<Project>;
  findById(id: number): Promise<Project | null>;
  findAll(params: {
    skip: number;
    take: number;
    orderBy: keyof Project;
    order: 'ASC' | 'DESC';
  }): Promise<[Project[], number]>;
  update(id: number, data: Partial<Project>): Promise<Project>;
  delete(id: number): Promise<void>;
}

export const PROJECT_REPO = Symbol('PROJECT_REPO');
