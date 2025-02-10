import { CastMember } from 'src/core/domain/entities/cast-member.entity';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';

export type CastMemberOutput = {
  id: string;
  name: string;
  type: CastMemberTypeEnum;
  created_at: Date;
};

export class CastMemberOutputMapper {
  static toOutput(entity: CastMember): CastMemberOutput {
    const { castMemberId, ...otherProps } = entity.toJSON();
    return {
      id: castMemberId,
      ...otherProps,
    };
  }
}
