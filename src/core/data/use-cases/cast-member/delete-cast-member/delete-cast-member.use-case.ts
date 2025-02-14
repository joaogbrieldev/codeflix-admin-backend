import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import {
  IDeleteCastMemberInput,
  IDeleteCastMemberUseCase,
} from 'src/core/domain/contracts/use-cases/cast-member/delete-cast-member';
import { CastMemberId } from 'src/core/domain/entities/cast-member/cast-member.aggregate';

export class DeleteCastMemberUseCase implements IDeleteCastMemberUseCase {
  constructor(private readonly _castMemberRepository: ICastMemberRepository) {}
  async execute(input: IDeleteCastMemberInput): Promise<void> {
    const castMemberId = new CastMemberId(input.id);
    await this._castMemberRepository.delete(castMemberId);
  }
}
