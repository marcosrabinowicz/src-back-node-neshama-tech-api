// DTOs (borda HTTP)
export * from './dto/create-project.dto';
export * from './dto/update-project.dto';
export * from './dto/query-project.dto';

// Service (Application Layer)
export * from './projects.service';

// Mapper (HTTP ↔ Domínio)
export * from './mappers/project.mapper';

// (Opcional) Casos de uso específicos (se criar a pasta/use-cases)
// export * from './use-cases/create-project.use-case';
// export * from './use-cases/update-project.use-case';
// export * from './use-cases/list-projects.use-case';
// export * from './use-cases/get-project.use-case';
// export * from './use-cases/delete-project.use-case';
