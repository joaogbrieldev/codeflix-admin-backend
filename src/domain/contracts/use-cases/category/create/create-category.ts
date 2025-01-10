import { IUseCase } from "@shared/src/domain/use-cases/use-case";

export type ICreateCategoryInput = {
  name: string;
  description?: string | null;
  is_active: boolean;
}

export type ICreateCategoryOutput = {
  id: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at: Date;
}

export abstract class ICreateCategoryUseCase implements IUseCase<ICreateCategoryInput, ICreateCategoryOutput>{
  abstract execute(input: ICreateCategoryInput): Promise<ICreateCategoryOutput>;
}