import { Uuid } from 'src/@shared/src/domain/value-objects/uuid.vo';
import { ValueObject } from 'src/@shared/src/domain/value-objects/value-object';
import { ICastMember } from '../contracts/entities/cast-member';
import { CastMemberTypeEnum } from '../types/cast-member.types';

export class CastMemberId extends Uuid {}

export type CastMemberConstructorProps = {
  castMemberId?: CastMemberId;
  name: string;
  type: CastMemberTypeEnum;
  created_at?: Date;
};

export type CastMemberCreateCommand = {
  name: string;
  type: CastMemberTypeEnum;
  created_at?: Date;
};

export class CastMember implements ICastMember {
  castMemberId: CastMemberId;
  name: string;
  type: CastMemberTypeEnum;
  created_at?: Date;

  constructor(props: CastMemberConstructorProps) {
    this.castMemberId = props.castMemberId ?? new CastMemberId();
    this.name = props.name;
    this.type = props.type;
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeType(type: CastMemberTypeEnum): void {
    this.type = type;
  }

  get entity_id(): ValueObject {
    return this.castMemberId;
  }

  static create(props: CastMemberCreateCommand): CastMember {
    const castMember = new CastMember(props);

    return castMember;
  }

  toJSON() {
    return {
      castMemberId: this.castMemberId.id,
      name: this.name,
      type: this.type,
      created_at: this.created_at,
    };
  }
}
