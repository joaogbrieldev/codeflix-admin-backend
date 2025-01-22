import { getModelToken } from '@nestjs/sequelize';
import { CreateCategoryUseCase } from 'src/core/data/use-cases/category/create/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/data/use-cases/category/delete/delete-category.use-case';
import { FindByIdCategoryUseCase } from 'src/core/data/use-cases/category/findById/findById-category.use-case';
import { GetAllCategoryUseCase } from 'src/core/data/use-cases/category/getAll/getAll-category.use-case';
import { UpdateCategoryUseCase } from 'src/core/data/use-cases/category/update/update-category.use-case';
import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategoryInMemoryRepository } from 'src/core/infra/repository/category/category-in-memory.repository';
import { CategorySequelizeRepository } from 'src/core/infra/repository/category/category.repository';

export const REPOSITORIES = {
  CATEGORY_REPOSITORY: {
    provide: 'CategoryRepository',
    useExisting: CategorySequelizeRepository,
  },
  CATEGORY_IN_MEMORY_REPOSITORY: {
    provide: CategoryInMemoryRepository,
    useClass: CategoryInMemoryRepository,
  },
  CATEGORY_SEQUELIZE_REPOSITORY: {
    provide: CategorySequelizeRepository,
    useFactory: (categoryModel: typeof CategoryModel) => {
      return new CategorySequelizeRepository(categoryModel);
    },
    inject: [getModelToken(CategoryModel)],
  },
};

export const USE_CASES = {
  CREATE_CATEGORY_USE_CASE: {
    provide: CreateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new CreateCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  UPDATE_CATEGORY_USE_CASE: {
    provide: UpdateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new UpdateCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  LIST_CATEGORIES_USE_CASE: {
    provide: GetAllCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new GetAllCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  GET_CATEGORY_USE_CASE: {
    provide: FindByIdCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new FindByIdCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  DELETE_CATEGORY_USE_CASE: {
    provide: DeleteCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new DeleteCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
};

export const CATEGORY_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};