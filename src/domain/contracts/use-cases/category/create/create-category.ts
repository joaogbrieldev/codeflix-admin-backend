import { IUseCase } from "@shared/src/domain/use-cases/use-case";
import { ValueObject } from "@shared/src/domain/value-objects/value-object";

export type ICreateCategoryInput = {
  name: string;
  description?: string;
  is_active: boolean;
}

export type ICreateCategoryOutput = {
  category_id: ValueObject;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at: Date;
}

export abstract class ICreateCategoryUseCase implements IUseCase<ICreateCategoryInput, ICreateCategoryOutput>{
  abstract execute(input: ICreateCategoryInput): Promise<ICreateCategoryOutput>;
}