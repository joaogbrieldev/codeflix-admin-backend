import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';

import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import {
  IGetCastMemberInputUseCase,
  IGetCastMemberUseCase,
} from 'src/core/domain/contracts/use-cases/cast-member/get-cast-member';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member/cast-member.aggregate';
import {
  CastMemberOutput,
  CastMemberOutputMapper,
} from '../create-cast-member/common/cast-member-output';

export class GetCastMemberUseCase implements IGetCastMemberUseCase {
  constructor(private readonly _castMemberRepository: ICastMemberRepository) {}
  async execute(input: IGetCastMemberInputUseCase): Promise<CastMemberOutput> {
    const castMemberId = new CastMemberId(input.id);
    const entity = await this._castMemberRepository.findById(castMemberId);
    if (!entity) {
      throw new NotFoundError(input.id, CastMember);
    }
    return CastMemberOutputMapper.toOutput(entity);
  }
}
