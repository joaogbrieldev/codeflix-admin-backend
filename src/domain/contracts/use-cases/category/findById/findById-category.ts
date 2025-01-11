import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { CategoryOutputMapper } from "src/data/use-cases/category/common/category-output";

export type IFindByIdInputUseCase = {
  id: string;
};

export abstract class IFindByIdCategoryUseCase
  implements IUseCase<IFindByIdInputUseCase, CategoryOutputMapper>
{
  abstract execute(input: IFindByIdInputUseCase): Promise<CategoryOutputMapper>;
}
