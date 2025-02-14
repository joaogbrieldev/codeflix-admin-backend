import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';
import { CreateCastMemberInput } from 'src/core/data/use-cases/cast-member/create-cast-member/create-cast-member.input.dto';

export abstract class ICreateCastMemberUseCase
  implements IUseCase<CreateCastMemberInput, CastMemberOutput>
{
  abstract execute(input: CreateCastMemberInput): Promise<CastMemberOutput>;
}
