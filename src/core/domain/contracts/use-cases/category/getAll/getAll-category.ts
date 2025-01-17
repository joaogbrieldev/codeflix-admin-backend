import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { Category } from 'src/core/domain/entities/category.entity';

export abstract class IGetAllCategoryUseCase
  implements IUseCase<any, Category[]>
{
  abstract execute(): Promise<Category[]>;
}
