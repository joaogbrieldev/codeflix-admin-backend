import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { CategoryId } from "src/domain/entities/category.entity";

export type IUpdateCategoryInput = {
  id: CategoryId;
  name: string;
  description: string;
  is_active: boolean;
}
export abstract class IUpdateCategoryUseCase implements IUseCase<IUpdateCategoryInput, void> {
  abstract execute(input: IUpdateCategoryInput): Promise<void>;
  
}