import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category/category.repository';
import {
  IDeleteCategoryInput,
  IDeleteCategoryUseCase,
} from 'src/core/domain/contracts/use-cases/category/delete/delete-category.use-case';
import { CategoryId } from 'src/core/domain/entities/category.aggregate';

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: IDeleteCategoryInput): Promise<void> {
    const categoryId = new CategoryId(input.id);
    await this._categoryRepository.delete(categoryId);
  }
}
