import { Uuid } from '@shared/src/domain/value-objects/uuid.vo';
import { setupSequelize } from '@shared/src/infra/test/helpers';
import { CreateCategoryUseCase } from 'src/core/category/create/create-category.use-case';
import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
import { ICreateCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/create/create-category';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategorySequelizeRepository } from 'src/core/infra/repository/category/category.repository';

import { CategoryFakeBuilder } from 'test/fake-builders/category.fake-builder';

describe('CreateCategoryUseCase Integration Test', () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: ICategoryRepository;
  let usecase: ICreateCategoryUseCase;
  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new CreateCategoryUseCase(repository);
  });
  test('should be create a category', async () => {
    jest.spyOn(repository, 'create');
    const input = CategoryFakeBuilder.aCategory().build();
    const execute = await usecase.execute(input);
    const entity = await repository.findById(new Uuid(input.category_id.id));
    expect(execute).toStrictEqual({
      id: entity?.category_id.id,
      name: entity?.name,
      description: entity?.description,
      is_active: entity?.is_active,
      created_at: entity?.created_at,
    });
    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});
