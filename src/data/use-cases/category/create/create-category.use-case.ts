import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import {
  ICreateCategoryInput,
  ICreateCategoryUseCase,
} from "src/domain/contracts/use-cases/category/create/create-category";
import { Category } from "src/domain/entities/category.entity";
import { CategoryOutputMapper } from "../common/category-output";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: ICreateCategoryInput): Promise<CategoryOutputMapper> {
    const entity = Category.create(input);
    await this._categoryRepository.create(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}
