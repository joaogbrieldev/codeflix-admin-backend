import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';

const models = [CategoryModel]

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite' as any,
      host: ':memory',
      logging: false,
      models: models,
    }),
    
  ],
})
export class DatabaseModule {}
