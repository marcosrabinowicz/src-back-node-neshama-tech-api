import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './application/projects.service';
import { CreateProjectDto } from './application/dto/create-project.dto';
import { UpdateProjectDto } from './application/dto/update-project.dto';
import { QueryProjectDto } from './application/dto/query-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly app: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.app.create(dto);
  }

  @Get()
  async findAll(@Query() q: QueryProjectDto) {
    const [data, total] = await this.app.list(q);
    const pageCount = Math.ceil(total / q.take);
    return { data, meta: { page: q.page, limit: q.take, total, pageCount } };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.app.get(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.app.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.app.delete(+id);
  }
}
