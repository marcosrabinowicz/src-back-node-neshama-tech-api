import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  IsString,
} from 'class-validator';

export class QueryProjectDto {
  @IsOptional() @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @IsInt() @IsPositive() limit?: number = 10;

  @IsOptional() @IsString() orderBy?: 'ordem' | 'titulo' = 'ordem';
  @IsOptional() @IsIn(['asc', 'desc']) orderDir?: 'asc' | 'desc' = 'asc';

  get skip() {
    return ((this.page ?? 1) - 1) * (this.limit ?? 10);
  }
  get take() {
    return this.limit ?? 10;
  }
  get order() {
    return (this.orderDir ?? 'asc').toUpperCase() as 'ASC' | 'DESC';
  }
}
