import { PaginationOutput } from 'src/@shared/src/data/pagination-output';
import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';
import { CastMemberFilter } from '../../repositories/cast-member/cast-member.repository';

export type ListCastMembersInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CastMemberFilter | null;
};

export type ListCastMembersOutput = PaginationOutput<CastMemberOutput>;

export abstract class IListCastMembersUseCase
  implements IUseCase<ListCastMembersInput, ListCastMembersOutput>
{
  abstract execute(input: ListCastMembersInput): Promise<ListCastMembersOutput>;
}
