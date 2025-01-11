import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { CategoryOutputMapper } from "src/data/use-cases/category/common/category-output";

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
