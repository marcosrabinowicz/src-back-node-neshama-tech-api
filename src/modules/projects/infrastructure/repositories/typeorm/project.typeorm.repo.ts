import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsOrder } from 'typeorm';
import type { IProjectRepository } from '../../../domain/repositories/project.repository.interface';
import { Project } from '../../../domain/entities/project.entity';

@Injectable()
export class ProjectTypeormRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project) private readonly orm: Repository<Project>
  ) {}

  create(data: Project) {
    const entity = this.orm.create(data);
    return this.orm.save(entity);
  }

  findById(id: number) {
    return this.orm.findOne({ where: { id } });
  }

  async findAll(params: {
    skip: number;
    take: number;
    orderBy: keyof Project;
    order: 'ASC' | 'DESC';
  }): Promise<[Project[], number]> {
    const { skip, take, orderBy, order } = params;

    const orderClause: FindOptionsOrder<Project> = {
      [orderBy]: order,
    } as FindOptionsOrder<Project>;

    const [rows, total] = await this.orm.findAndCount({
      skip,
      take,
      order: orderClause,
    });

    return [rows, total];
  }

  async update(id: number, data: Partial<Project>) {
    const item = await this.findById(id);
    if (!item) throw new NotFoundException('Project not found');
    Object.assign(item, data);
    return this.orm.save(item);
  }

  async delete(id: number) {
    const item = await this.findById(id);
    if (!item) throw new NotFoundException('Project not found');
    await this.orm.remove(item);
  }
}
