import { NotFoundError } from "@shared/src/domain/errors/not-found.error";
import { setupSequelize } from "@shared/src/infra/test/helpers";
import { UpdateCategoryUseCase } from "src/data/use-cases/category/Update/Update-category.use-case";
import { Category, CategoryId } from "src/domain/entities/category.entity";
import { CategoryModel } from "src/infra/db/postgres/category/category.model";
import { CategorySequelizeRepository } from "src/infra/repository/category/category.repository";

describe("UpdateCategoryUseCase Integration Tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    const categoryId = new CategoryId();
    await expect(() => useCase.execute({ id: categoryId.id })).rejects.toThrow(
      new NotFoundError(categoryId.id, Category)
    );
  });

  it("should Update a category", async () => {
    const category = new Category({ name: "name 1" });
    const categoryUpdated = new Category({ name: "name 2" });
    await repository.create(category);
    category.changeName(categoryUpdated.name);
    const execute = await useCase.execute({
      id: category.category_id.id,
      name: categoryUpdated.name,
    });
    expect(execute).toStrictEqual({
      id: category.category_id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    });
  });
});
