import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';

export type IDeleteCastMemberInput = {
  id: string;
};

export abstract class IDeleteCastMemberUseCase
  implements IUseCase<IDeleteCastMemberInput, void>
{
  abstract execute(input: IDeleteCastMemberInput): Promise<void>;
}
