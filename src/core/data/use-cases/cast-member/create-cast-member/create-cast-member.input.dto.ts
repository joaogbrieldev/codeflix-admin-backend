import { IsInt, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';

export type CreateCastMemberInputConstructorProps = {
  name: string;
  type: CastMemberTypeEnum;
};

export class CreateCastMemberInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  type: CastMemberTypeEnum;

  constructor(props?: CreateCastMemberInputConstructorProps) {
    if (!props) return;
    this.name = props.name;
    this.type = props.type;
  }
}

export class ValidateCreateCastMemberInput {
  static validate(input: CreateCastMemberInput) {
    return validateSync(input);
  }
}
