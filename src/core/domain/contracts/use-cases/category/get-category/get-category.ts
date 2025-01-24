import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CategoryOutput } from 'src/core/data/use-cases/category/common/category-output';

export type IGetCategoryInputUseCase = {
  id: string;
};

export abstract class IGetCategoryUseCase
  implements IUseCase<IGetCategoryInputUseCase, CategoryOutput>
{
  abstract execute(input: IGetCategoryInputUseCase): Promise<CategoryOutput>;
}
