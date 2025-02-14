import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { EntityValidationError } from 'src/@shared/src/domain/validators/validators.error';
import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import { CastMember } from 'src/core/domain/entities/cast-member/cast-member.aggregate';
import { CastMemberType } from 'src/core/domain/types/cast-member.types';
import {
  CastMemberOutput,
  CastMemberOutputMapper,
} from './common/cast-member-output';
import { CreateCastMemberInput } from './create-cast-member.input.dto';

export class CreateCastMemberUseCase
  implements IUseCase<CreateCastMemberInput, CreateCastMemberOutput>
{
  constructor(private castMemberRepo: ICastMemberRepository) {}

  async execute(input: CreateCastMemberInput): Promise<CastMemberOutput> {
    const [type, errorCastMemberType] = CastMemberType.create(
      input.type,
    ).asArray();
    const entity = CastMember.create({
      ...input,
      type,
    });
    const notification = entity.notification;
    if (errorCastMemberType) {
      notification.setError(errorCastMemberType.message, 'type');
    }

    if (notification.hasErrors()) {
      throw new EntityValidationError(notification.toJSON());
    }

    await this.castMemberRepo.create(entity);
    return CastMemberOutputMapper.toOutput(entity);
  }
}

export type CreateCastMemberOutput = CastMemberOutput;
