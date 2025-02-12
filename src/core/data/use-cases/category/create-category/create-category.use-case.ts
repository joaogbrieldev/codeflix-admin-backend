import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category/category.repository';
import {
  ICreateCategoryInput,
  ICreateCategoryUseCase,
} from 'src/core/domain/contracts/use-cases/category/create/create-category';
import { Category } from 'src/core/domain/entities/category.aggregate';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: ICreateCategoryInput): Promise<CategoryOutput> {
    const entity = Category.create(input);
    try {
      await this._categoryRepository.create(entity);
    } catch (error) {
      console.log(error);
    }

    return CategoryOutputMapper.toOutput(entity);
  }
}
