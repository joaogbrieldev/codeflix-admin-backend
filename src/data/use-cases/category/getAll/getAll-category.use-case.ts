import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import { IGetAllCategoryUseCase } from "src/domain/contracts/use-cases/category/getAll/getAll-category";
import { Category } from "src/domain/entities/category.entity";

export class GetAllCategoryUseCase implements IGetAllCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository){}
  async execute(): Promise<Category[]> {
    return await this._categoryRepository.getAll();  
   
  }
} 
