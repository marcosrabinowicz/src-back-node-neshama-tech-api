import { IsNotEmpty, IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  tecnologias: string;

  @IsNotEmpty()
  @IsUrl()
  linkGithub: string;

  @IsNotEmpty()
  @IsString()
  demo: string;

  @IsNotEmpty()
  @IsString()
  imagem: string;

  @IsNotEmpty()
  @IsNumber()
  ordem: number;
}
