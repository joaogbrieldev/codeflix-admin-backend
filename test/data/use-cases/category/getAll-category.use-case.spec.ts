import { setupSequelize } from '@shared/src/infra/test/helpers';
import { GetAllCategoryUseCase } from 'src/core/category/getAll/getAll-category.use-case';
import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
import { IGetAllCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/getAll/getAll-category';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategorySequelizeRepository } from 'src/core/infra/repository/category/category.repository';
import { CategoryFakeBuilder } from 'test/fake-builders/category.fake-builder';

describe('GetAllCategoryUseCase Integration Test', () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: ICategoryRepository;
  let usecase: IGetAllCategoryUseCase;
  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new GetAllCategoryUseCase(repository);
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
