import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { isTrue } from '../shared';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        const type = config.get<'sqlite' | 'postgres'>('DB_TYPE', 'sqlite');

        if (type === 'postgres') {
          return {
            type: 'postgres',
            host: config.get('DB_HOST', 'localhost'),
            port: parseInt(config.get('DB_PORT', '5432'), 10),
            username: config.get('DB_USER', 'postgres'),
            password: config.get('DB_PASS', 'postgres'),
            database: config.get('DB_NAME', 'app'),
            autoLoadEntities: true,
            synchronize: config.get('DB_SYNC', 'false') === 'true',
            logging: config.get('DB_LOGGING', 'false') === 'true',
          } satisfies TypeOrmModuleOptions;
        }

        return {
          type: 'sqlite',
          database: config.get('DB_FILE', 'db.sqlite'),
          autoLoadEntities: true,
          synchronize: isTrue(config.get('DB_SYNC', 'true')),
          logging: isTrue(config.get('DB_LOGGING')),
        } satisfies TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
