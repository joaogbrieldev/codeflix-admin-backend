import { setupSequelize } from "@shared/src/infra/test/helpers";
import { GetAllCategoryUseCase } from "src/data/use-cases/category/getAll/getAll-category.use-case";
import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import { IGetAllCategoryUseCase } from "src/domain/contracts/use-cases/category/getAll/getAll-category";
import { CategoryModel } from "src/infra/db/postgres/category/category.model";
import { CategorySequelizeRepository } from "src/infra/repository/category/category.repository";
import { CategoryFakeBuilder } from "test/fake-builders/category.fake-builder";

describe("CreateCategoryUseCase Integration Test", () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: ICategoryRepository;
  let usecase: IGetAllCategoryUseCase;
  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new GetAllCategoryUseCase(repository);
  });
  test("should be create a category", async () => {
    jest.spyOn(repository, "getAll");
    const category1 = CategoryFakeBuilder.aCategory().build();
    const category2 = CategoryFakeBuilder.aCategory().build();
    repository.create(category1);
    repository.create(category2);
    const items = await repository.getAll();
    console.log(items);
    expect(items).toStrictEqual([category1, category2]);
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });
});
