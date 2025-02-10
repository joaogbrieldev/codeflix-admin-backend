import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CONFIG_SCHEMA_TYPE } from '../config-module/config.module';

const models = [CategoryModel, CastMemberModel];

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
            storage: configService.get<string>('DB_HOST'),
            models,
            logging: isLoggingEnabled,
            autoLoadModels,
          };
        }

        if (dbVendor === 'mysql') {
          return {
            dialect: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: Number(configService.get<number>('DB_PORT')) || 3306,
            database: configService.get<string>('DB_DATABASE'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            models,
            logging: isLoggingEnabled,
            autoLoadModels,
            synchronize: true,
            pool: {
              max: 10,
              min: 2,
              acquire: 30000,
              idle: 10000,
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
