import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category/category.repository';

import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategorySequelizeRepository } from 'src/core/infra/repository/category/category.repository';
import { CategoryFakeBuilder } from 'src/test/fake-builders/category.fake-builder';

describe('GetAllCategoryUseCase Integration Test', () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: ICategoryRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
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
