import { NotFoundError } from "@shared/src/domain/errors/not-found.error";

import { ICategoryRepository } from "src/core/domain/contracts/repositories/category.repository";
import { IFindByIdCategoryUseCase, IFindByIdInputUseCase } from "src/core/domain/contracts/use-cases/category/findById/findById-category";
import { Category, CategoryId } from "src/core/domain/entities/category.entity";
import { CategoryOutputMapper } from "../common/category-output";

export class FindByIdCategoryUseCase implements IFindByIdCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: IFindByIdInputUseCase): Promise<CategoryOutputMapper> {
    const categoryId = new CategoryId(input.id);
    const entity = await this._categoryRepository.findById(categoryId);
    if (!entity) {
      throw new NotFoundError(input.id, Category);
    }
    return CategoryOutputMapper.toOutput(entity);
  }
}
