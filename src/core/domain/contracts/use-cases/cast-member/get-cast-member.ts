import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';

export type IGetCastMemberInputUseCase = {
  id: string;
};

export abstract class IGetCastMemberUseCase
  implements IUseCase<IGetCastMemberInputUseCase, CastMemberOutput>
{
  abstract execute(
    input: IGetCastMemberInputUseCase,
  ): Promise<CastMemberOutput>;
}
