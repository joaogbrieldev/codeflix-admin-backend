import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';

import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import {
  IUpdateCastMemberInput,
  IUpdateCastMemberUseCase,
} from 'src/core/domain/contracts/use-cases/cast-member/update-cast-member';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member.entity';
import {
  CastMemberOutput,
  CastMemberOutputMapper,
} from '../create-cast-member/common/cast-member-output';

export class UpdateCastMemberUseCase implements IUpdateCastMemberUseCase {
  constructor(private readonly _castMemberRepository: ICastMemberRepository) {}
  async execute(input: IUpdateCastMemberInput): Promise<CastMemberOutput> {
    const castMemberId = new CastMemberId(input.id);
    const castMember = await this._castMemberRepository.findById(castMemberId);
    if (!castMember) {
      throw new NotFoundError(input.id, CastMember);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    input.name && castMember.changeName(input.name);

    if (input.type) castMember.changeType(input.type);

    await this._castMemberRepository.update(castMember);

    return CastMemberOutputMapper.toOutput(castMember);
  }
}
