import { Module } from '@nestjs/common';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategorySequelizeRepository } from 'src/core/infra/repository/category/category.repository';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  imports: [SequelizeModule.forFeature([CategoryModel])],
  providers: [
    {
      provide: CategorySequelizeRepository,
      useFactory: (categoryModel: typeof CategoryModel) =>
        new CategorySequelizeRepository(categoryModel),
      inject: [getModelToken(CategoryModel)],
    },
  ],
})
export class CategoriesModule {}
