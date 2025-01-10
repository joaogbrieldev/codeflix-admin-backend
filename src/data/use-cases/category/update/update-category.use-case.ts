import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import { IUpdateCategoryInput, IUpdateCategoryUseCase } from "src/domain/contracts/use-cases/category/update/update-category";
import { Category } from "src/domain/entities/category.entity";

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase{
  constructor(private readonly _categoryRepository: ICategoryRepository){};
  async execute(input: IUpdateCategoryInput): Promise<void> {
    const entity = await this._categoryRepository.findById(input.id);
    if (!entity){
      throw new Error('Category Not Found!')
    }
    await this._categoryRepository.update(new Category({
      category_id: input.id,
      name: input.name,
      description: input.description,
      is_active: input.is_active,
    }))
  }
}