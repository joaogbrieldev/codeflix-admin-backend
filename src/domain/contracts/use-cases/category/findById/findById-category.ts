import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { CategoryId } from "src/domain/entities/category.entity";

export type IFindByIdInputUseCase = {
  id: CategoryId;
};

export type IFindByIdOutputUseCase = {
  id: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at: Date;
};

export abstract class IFindByIdCategoryUseCase implements IUseCase<IFindByIdInputUseCase, IFindByIdOutputUseCase> {
  abstract execute(input: IFindByIdInputUseCase): Promise<IFindByIdOutputUseCase>;
}
