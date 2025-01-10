import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { CategoryId } from "src/domain/entities/category.entity";

export type IDeleteCategoryInput = {
  id: CategoryId;
}

export abstract class IDeleteCategoryUseCase implements IUseCase<IDeleteCategoryInput, void> {
  abstract execute(input: IDeleteCategoryInput): Promise<void>;
}