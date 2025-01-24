import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CategoryOutput } from 'src/core/data/use-cases/category/common/category-output';

export type IUpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string;
  is_active?: boolean;
};

export abstract class IUpdateCategoryUseCase
  implements IUseCase<IUpdateCategoryInput, CategoryOutput>
{
  abstract execute(input: IUpdateCategoryInput): Promise<CategoryOutput>;
}
