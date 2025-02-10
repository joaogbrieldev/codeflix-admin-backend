import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member.entity';
import { CastMemberModel } from '../../db/postgres/cast-member/cast-member.model';

export class CastMemberModelMapper {
  static toModel(entity: CastMember): CastMemberModel {
    return CastMemberModel.build({
      cast_member_id: entity.castMemberId.id,
      name: entity.name,
      type: entity.type,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: CastMemberModel): CastMember {
    const castMember = new CastMember({
      castMemberId: new CastMemberId(model.cast_member_id),
      name: model.name,
      type: model.type,
      created_at: model.created_at,
    });
    return castMember;
  }
}
