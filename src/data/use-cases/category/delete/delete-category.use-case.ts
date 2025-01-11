import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import {
  IDeleteCategoryInput,
  IDeleteCategoryUseCase,
} from "src/domain/contracts/use-cases/category/delete/delete-category.use-case";
import { CategoryId } from "src/domain/entities/category.entity";

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: IDeleteCategoryInput): Promise<void> {
    const categoryId = new CategoryId(input.id);
    await this._categoryRepository.delete(categoryId);
  }
}
