import { IUseCase } from "@shared/src/domain/use-cases/use-case";

export type IFindByIdInputUseCase = {
  id: string;
};

export type IFindByIdOutputUseCase = {
  id: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at: Date;
};

export abstract class IFindByIdCategoryUseCase
  implements IUseCase<IFindByIdInputUseCase, IFindByIdOutputUseCase>
{
  abstract execute(
    input: IFindByIdInputUseCase
  ): Promise<IFindByIdOutputUseCase>;
}
