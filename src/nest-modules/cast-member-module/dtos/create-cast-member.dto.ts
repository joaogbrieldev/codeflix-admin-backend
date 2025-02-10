import {
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';

export type CreateCastMemberInputConstructorProps = {
  name: string;
  type: CastMemberTypeEnum;
  is_active?: boolean;
};

export class CreateCastMemberInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  type: CastMemberTypeEnum;

  constructor(props: CreateCastMemberInputConstructorProps) {
    if (!props) return;
    this.name = props.name;
    this.type = props.type;
  }
}

export class ValidateCreateCastMemberInput {
  static validate(input: CreateCastMemberInputDto) {
    return validateSync(input);
  }
}
