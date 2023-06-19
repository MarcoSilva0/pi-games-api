import { Injectable, Inject } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: parseInt(process.env.DATABASE_PORT) ?? 3306,
      database: process.env.DATABASE_NAME ?? 'nestjs-auth',
      username: process.env.DATABASE_USER ?? 'root',
      password: process.env.DATABASE_PASSWORD ?? '',
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}