import { Either } from 'src/@shared/src/domain/either';
import { ValueObject } from 'src/@shared/src/domain/value-objects/value-object';

export enum CastMemberTypeEnum {
  DIRECTOR = 1,
  ACTOR = 2,
}

export class CastMemberType extends ValueObject {
  constructor(readonly type: CastMemberTypeEnum) {
    super();
    this.validate();
  }

  private validate() {
    const isValid =
      this.type === CastMemberTypeEnum.DIRECTOR ||
      this.type === CastMemberTypeEnum.ACTOR;
    if (!isValid) {
      throw new InvalidCastMemberTypeError(this.type);
    }
  }

  static create(
    value: CastMemberTypeEnum,
  ): Either<CastMemberType, InvalidCastMemberTypeError> {
    return Either.safe(() => new CastMemberType(value));
  }

  static createAnActor() {
    return CastMemberType.create(CastMemberTypeEnum.ACTOR).ok;
  }

  static createADirector() {
    return CastMemberType.create(CastMemberTypeEnum.DIRECTOR).ok;
  }
}

export class InvalidCastMemberTypeError extends Error {
  constructor(invalidType: any) {
    super(`Invalid cast member type: ${invalidType}`);
    this.name = 'InvalidCastMemberTypeError';
  }
}
