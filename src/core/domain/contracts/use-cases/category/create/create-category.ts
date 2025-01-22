import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CategoryOutput } from 'src/core/data/use-cases/category/common/category-output';

export type ICreateCategoryInput = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export abstract class ICreateCategoryUseCase
  implements IUseCase<ICreateCategoryInput, CategoryOutput>
{
  abstract execute(input: ICreateCategoryInput): Promise<CategoryOutput>;
}
