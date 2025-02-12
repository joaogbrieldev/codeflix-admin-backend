import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';

import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category/category.repository';
import {
  IGetCategoryInputUseCase,
  IGetCategoryUseCase,
} from 'src/core/domain/contracts/use-cases/category/get-category/get-category';
import {
  Category,
  CategoryId,
} from 'src/core/domain/entities/category.aggregate';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export class GetCategoryUseCase implements IGetCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: IGetCategoryInputUseCase): Promise<CategoryOutput> {
    const categoryId = new CategoryId(input.id);
    const entity = await this._categoryRepository.findById(categoryId);
    if (!entity) {
      throw new NotFoundError(input.id, Category);
    }
    return CategoryOutputMapper.toOutput(entity);
  }
}
