import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';
import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { DeleteCategoryUseCase } from 'src/core/category/delete/delete-category.use-case';
import { Category, CategoryId } from 'src/core/domain/entities/category.entity';
import { CategoryModel } from 'src/core/infra/db/postgres/category/category.model';
import { CategorySequelizeRepository } from 'src/core/infra/repository/category/category.repository';

import { CategoryFakeBuilder } from 'test/fake-builders/category.fake-builder';

describe('DeleteCategoryUseCase Integration Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const categoryId = new CategoryId();
    await expect(() => useCase.execute({ id: categoryId.id })).rejects.toThrow(
      new NotFoundError(categoryId.id, Category),
    );
  });

  it('should delete a category', async () => {
    const category = CategoryFakeBuilder.aCategory().build();
    await repository.create(category);
    await useCase.execute({
      id: category.category_id.id,
    });
    await expect(repository.findById(category.category_id)).resolves.toBeNull();
  });
});
