import IEntityBase from 'src/@shared/src/domain/contracts/entity/entity-base';
import { CastMemberTypeEnum } from '../../types/cast-member.types';

export interface ICastMember extends IEntityBase {
  name: string;
  type: CastMemberTypeEnum;
}
