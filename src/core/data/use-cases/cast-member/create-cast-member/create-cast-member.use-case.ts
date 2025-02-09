import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import {
  ICreateCastMemberInput,
  ICreateCastMemberUseCase,
} from 'src/core/domain/contracts/use-cases/cast-member/create-cast-member';
import { CastMember } from 'src/core/domain/entities/cast-member.entity';
import {
  CastMemberOutput,
  CastMemberOutputMapper,
} from './common/cast-member-output';

export class CreateCastMemberUseCase implements ICreateCastMemberUseCase {
  constructor(private readonly _castMemberRepository: ICastMemberRepository) {}
  async execute(input: ICreateCastMemberInput): Promise<CastMemberOutput> {
    const castMember = CastMember.create(input);
    await this._castMemberRepository.create(castMember);
    return CastMemberOutputMapper.toOutput(castMember);
  }
}
