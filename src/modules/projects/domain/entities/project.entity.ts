import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'text' })
  tecnologias: string;

  @Column()
  linkGithub: string;

  @Column()
  demo: string;

  @Column()
  imagem: string;

  @Column()
  ordem: number;
}
