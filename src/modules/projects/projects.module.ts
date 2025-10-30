import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './application/projects.service';
import { Project } from './domain/entities/project.entity';
import { PROJECT_REPO } from './domain/repositories/project.repository.interface';
import { ProjectTypeormRepository } from './infrastructure/repositories/typeorm/project.typeorm.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    { provide: PROJECT_REPO, useClass: ProjectTypeormRepository },
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
