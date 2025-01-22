import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './categories.providers';

@Module({
  controllers: [CategoriesController],
  imports: [SequelizeModule.forFeature([CategoryModel])],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}
