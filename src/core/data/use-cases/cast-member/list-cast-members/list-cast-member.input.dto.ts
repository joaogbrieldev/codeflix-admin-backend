import { IsInt, ValidateNested, validateSync } from 'class-validator';
import { SearchInput } from 'src/@shared/src/data/search-input';
import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';

export class ListCastMembersFilter {
  name?: string | null;
  @IsInt()
  type?: CastMemberTypeEnum | null;
}

export class ListCastMembersInput
  implements SearchInput<ListCastMembersFilter>
{
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: ListCastMembersFilter;
}

export class ValidateListCastMembersInput {
  static validate(input: ListCastMembersInput) {
    return validateSync(input);
  }
}
