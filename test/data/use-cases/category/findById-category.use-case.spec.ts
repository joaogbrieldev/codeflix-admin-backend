import { NotFoundError } from "@shared/src/domain/errors/not-found.error";
import { setupSequelize } from "@shared/src/infra/test/helpers";
import { FindByIdCategoryUseCase } from "src/core/category/findById/findById-category.use-case";

import { Category, CategoryId } from "src/core/domain/entities/category.entity";
import { CategoryModel } from "src/core/infra/db/postgres/category/category.model";
import { CategorySequelizeRepository } from "src/core/infra/repository/category/category.repository";
import { CategoryFakeBuilder } from "test/fake-builders/category.fake-builder";

describe("FindByIdCategoryUseCase Integration Tests", () => {
  let useCase: FindByIdCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new FindByIdCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    const categoryId = new CategoryId();
    await expect(() => useCase.execute({ id: categoryId.id })).rejects.toThrow(
      new NotFoundError(categoryId.id, Category)
    );
  });

  it("should FindById a category", async () => {
    const category = CategoryFakeBuilder.aCategory().build();
    await repository.create(category);
    const execute = await useCase.execute({
      id: category.category_id.id,
    });
    expect(execute).toStrictEqual({
      id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    });
  });
});
