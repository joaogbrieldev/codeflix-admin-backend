import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { ListCategoriesUseCase } from 'src/core/data/use-cases/category/list-categories/list-categories';

import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
import { IListCategoriesUseCase } from 'src/core/domain/contracts/use-cases/category/list-categories/list-categories';

import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategorySequelizeRepository } from 'src/core/infra/repository/category/category.repository';
import { CategoryFakeBuilder } from 'src/test/fake-builders/category.fake-builder';

describe('GetAllCategoryUseCase Integration Test', () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: ICategoryRepository;
  let usecase: IListCategoriesUseCase;
  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new ListCategoriesUseCase(repository);
  });
  test('should be getAll a category', async () => {
    jest.spyOn(repository, 'getAll');
    const category1 = CategoryFakeBuilder.aCategory().build();
    const category2 = CategoryFakeBuilder.aCategory().build();
    repository.create(category1);
    repository.create(category2);
    const items = await repository.getAll();
    expect(items).toStrictEqual([category1, category2]);
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });
});
