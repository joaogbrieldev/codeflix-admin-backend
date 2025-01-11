import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { CategoryId } from "src/domain/entities/category.entity";

export type IUpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string;
  is_active?: boolean;
};

export type IUpdateCategoryOutput = {
  id: CategoryId;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export abstract class IUpdateCategoryUseCase
  implements IUseCase<IUpdateCategoryInput, IUpdateCategoryOutput>
{
  abstract execute(input: IUpdateCategoryInput): Promise<IUpdateCategoryOutput>;
}
