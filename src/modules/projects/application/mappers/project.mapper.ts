import { Project } from '../../domain';
import { CreateProjectDto } from '../dto/create-project.dto';

export class ProjectMapper {
  static fromCreateDto(dto: CreateProjectDto): Project {
    const p = new Project();
    p.titulo = dto.titulo;
    p.descricao = dto.descricao;
    p.tecnologias = dto.tecnologias;
    p.linkGithub = dto.linkGithub;
    p.demo = dto.demo;
    p.imagem = dto.imagem;
    p.ordem = dto.ordem;
    return p;
  }
}
