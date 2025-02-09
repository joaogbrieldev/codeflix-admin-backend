import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';

export type IUpdateCastMemberInput = {
  id: string;
  name?: string;
  description?: string;
  is_active?: boolean;
};

export abstract class IUpdateCastMemberUseCase
  implements IUseCase<IUpdateCastMemberInput, CastMemberOutput>
{
  abstract execute(input: IUpdateCastMemberInput): Promise<CastMemberOutput>;
}
