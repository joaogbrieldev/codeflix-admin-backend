import { PaginationOutputMapper } from 'src/@shared/src/data/pagination-output';

import {
  CastMemberSearchParams,
  CastMemberSearchResult,
  ICastMemberRepository,
} from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import {
  IListCastMembersUseCase,
  ListCastMembersInput,
  ListCastMembersOutput,
} from 'src/core/domain/contracts/use-cases/cast-member/list-cast-members';
import { CastMemberOutputMapper } from '../create-cast-member/common/cast-member-output';

export class ListCastMembersUseCase implements IListCastMembersUseCase {
  constructor(private _castMemberRepository: ICastMemberRepository) {}

  async execute(input: ListCastMembersInput): Promise<ListCastMembersOutput> {
    const params = new CastMemberSearchParams(input);
    const searchResult = await this._castMemberRepository.search(params);
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
