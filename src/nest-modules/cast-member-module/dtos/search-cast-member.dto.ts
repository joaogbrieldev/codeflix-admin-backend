import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { CastMemberFilter } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import { ListCastMembersInput } from 'src/core/domain/contracts/use-cases/cast-member/list-cast-members';

export class SearchCastMembersDto implements ListCastMembersInput {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection;
  filter?: CastMemberFilter;
}
