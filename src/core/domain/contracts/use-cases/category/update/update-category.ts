import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { CategoryOutputMapper } from "src/core/category/common/category-output";


export type IUpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string;
  is_active?: boolean;
};

export abstract class IUpdateCategoryUseCase
  implements IUseCase<IUpdateCategoryInput, CategoryOutputMapper>
{
  abstract execute(input: IUpdateCategoryInput): Promise<CategoryOutputMapper>;
}
