import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPO } from '../domain/repositories/project.repository.interface';
import type { IProjectRepository } from '../domain/repositories/project.repository.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectMapper } from './mappers/project.mapper';
import { QueryProjectDto } from './dto/query-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(PROJECT_REPO) private readonly repo: IProjectRepository
  ) {}

  create(dto: CreateProjectDto) {
    const entity = ProjectMapper.fromCreateDto(dto);
    return this.repo.create(entity);
  }

  list(query: QueryProjectDto) {
    return this.repo.findAll({
      skip: query.skip,
      take: query.take,
      orderBy: query.orderBy ?? 'ordem',
      order: query.order,
    });
  }

  get(id: number) {
    return this.repo.findById(id);
  }
  update(id: number, dto: UpdateProjectDto) {
    return this.repo.update(id, dto);
  }
  delete(id: number) {
    return this.repo.delete(id);
  }
}
