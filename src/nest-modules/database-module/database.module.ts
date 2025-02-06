import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CONFIG_SCHEMA_TYPE } from '../config-module/config.module';

const models = [CategoryModel];

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const dbVendor = configService.get<string>('DB_VENDOR');
        const isLoggingEnabled =
          configService.get<boolean>('DB_LOGGING') ?? false;
        const autoLoadModels =
          configService.get<boolean>('DB_AUTO_LOAD_MODELS') ?? false;

        if (dbVendor === 'sqlite') {
          return {
            dialect: 'sqlite',
            storage: configService.get<string>('DB_HOST'), // Para SQLite, host é na verdade o caminho do arquivo
            models,
            logging: isLoggingEnabled,
            autoLoadModels,
          };
        }

        if (dbVendor === 'mysql') {
          return {
            dialect: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: Number(configService.get<number>('DB_PORT')) || 3306, // Garante que seja um número
            database: configService.get<string>('DB_DATABASE'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            models,
            logging: isLoggingEnabled,
            autoLoadModels,
            synchronize: true, // Evita recriação de tabelas automaticamente
            pool: {
              max: 10, // Limita número máximo de conexões
              min: 2, // Número mínimo de conexões
              acquire: 30000, // Tempo máximo de espera para uma conexão
              idle: 10000, // Tempo que uma conexão fica inativa antes de ser liberada
            },
          };
        }

        throw new Error(`Unsupported database configuration: ${dbVendor}`);
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
