import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CategoryOutputMapper } from 'src/core/category/common/category-output';

export type IFindByIdInputUseCase = {
  id: string;
};

export abstract class IFindByIdCategoryUseCase
  implements IUseCase<IFindByIdInputUseCase, CategoryOutputMapper>
{
  abstract execute(input: IFindByIdInputUseCase): Promise<CategoryOutputMapper>;
}
