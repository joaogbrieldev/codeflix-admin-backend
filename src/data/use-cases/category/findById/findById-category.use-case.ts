import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import { IFindByIdCategoryUseCase, IFindByIdInputUseCase, IFindByIdOutputUseCase } from "src/domain/contracts/use-cases/category/findById/findById-category";

export class FindByIdCategoryUseCase implements IFindByIdCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository){}
  async execute(input: IFindByIdInputUseCase): Promise<IFindByIdOutputUseCase> {
    const entity = await this._categoryRepository.findById(input.id);
    if (!entity){
      throw new Error('Category Not Found!')
    }
    return {
        id: entity.category_id.id,
        name: entity.name,
        description: entity.description,
        is_active: entity.is_active,
        created_at: entity.created_at
   }
  }
}