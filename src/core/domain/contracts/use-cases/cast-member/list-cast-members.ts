import { PaginationOutput } from 'src/@shared/src/data/pagination-output';
import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';
import { ListCastMembersInput } from 'src/core/data/use-cases/cast-member/list-cast-members/list-cast-member.input.dto';

export type ListCastMembersOutput = PaginationOutput<CastMemberOutput>;

export abstract class IListCastMembersUseCase
  implements IUseCase<ListCastMembersInput, ListCastMembersOutput>
{
  abstract execute(input: ListCastMembersInput): Promise<ListCastMembersOutput>;
}
