import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';

export type IDeleteCategoryInput = {
  id: string;
};

export abstract class IDeleteCategoryUseCase
  implements IUseCase<IDeleteCategoryInput, void>
{
  abstract execute(input: IDeleteCategoryInput): Promise<void>;
}
