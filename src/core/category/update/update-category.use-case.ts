import { NotFoundError } from '@shared/src/domain/errors/not-found.error';

import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
import {
  IUpdateCategoryInput,
  IUpdateCategoryUseCase,
} from 'src/core/domain/contracts/use-cases/category/update/update-category';
import { Category, CategoryId } from 'src/core/domain/entities/category.entity';
import { CategoryOutputMapper } from '../common/category-output';

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: IUpdateCategoryInput): Promise<CategoryOutputMapper> {
    const categoryId = new CategoryId(input.id);
    const category = await this._categoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundError(input.id, Category);
    }
    input.name && category.changeName(input.name);

    if ('description' in input) {
      category.changeDescription(input.description || null);
    }

    if (input.is_active === true) {
      category.activate();
    }

    if (input.is_active === false) {
      category.deactivate();
    }

    await this._categoryRepository.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}
