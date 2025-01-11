import { NotFoundError } from "@shared/src/domain/errors/not-found.error";
import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import {
  IFindByIdCategoryUseCase,
  IFindByIdInputUseCase,
  IFindByIdOutputUseCase,
} from "src/domain/contracts/use-cases/category/findById/findById-category";
import { Category, CategoryId } from "src/domain/entities/category.entity";

export class FindByIdCategoryUseCase implements IFindByIdCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository) {}
  async execute(input: IFindByIdInputUseCase): Promise<IFindByIdOutputUseCase> {
    const categoryId = new CategoryId(input.id);
    const entity = await this._categoryRepository.findById(categoryId);
    if (!entity) {
      throw new NotFoundError(input.id, Category);
    }
    return {
      id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}
