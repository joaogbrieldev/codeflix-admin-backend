import {
  PaginationOutput,
  PaginationOutputMapper,
} from 'src/@shared/src/data/pagination-output';
import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import {
  CastMemberSearchParams,
  CastMemberSearchResult,
  ICastMemberRepository,
} from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import {
  CastMemberOutput,
  CastMemberOutputMapper,
} from '../create-cast-member/common/cast-member-output';
import { ListCastMembersInput } from './list-cast-member.input.dto';

export class ListCastMembersUseCase
  implements IUseCase<ListCastMembersInput, ListCastMembersOutput>
{
  constructor(private castMemberRepo: ICastMemberRepository) {}

  async execute(input: ListCastMembersInput): Promise<ListCastMembersOutput> {
    const params = CastMemberSearchParams.create(input);
    const searchResult = await this.castMemberRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(
    searchResult: CastMemberSearchResult,
  ): ListCastMembersOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return CastMemberOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListCastMembersOutput = PaginationOutput<CastMemberOutput>;
