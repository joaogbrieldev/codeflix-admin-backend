import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CategoryOutputMapper } from 'src/core/category/common/category-output';

export type ICreateCategoryInput = {
  name: string;
  description?: string | null;
  is_active: boolean;
};

export abstract class ICreateCategoryUseCase
  implements IUseCase<ICreateCategoryInput, CategoryOutputMapper>
{
  abstract execute(input: ICreateCategoryInput): Promise<CategoryOutputMapper>;
}
