import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import { IDeleteCategoryInput, IDeleteCategoryUseCase } from "src/domain/contracts/use-cases/category/delete/delete-category.use-case";

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository){}
  async execute(input: IDeleteCategoryInput): Promise<void> {
    const entity = await this._categoryRepository.findById(input.id);
    if (!entity) throw new Error('Category Not Found!')
    await this._categoryRepository.delete(entity.category_id);
  }
}