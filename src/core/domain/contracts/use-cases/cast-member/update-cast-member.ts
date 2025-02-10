import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';

export type IUpdateCastMemberInput = {
  id: string;
  name?: string;
  type?: CastMemberTypeEnum;
};

export abstract class IUpdateCastMemberUseCase
  implements IUseCase<IUpdateCastMemberInput, CastMemberOutput>
{
  abstract execute(input: IUpdateCastMemberInput): Promise<CastMemberOutput>;
}
