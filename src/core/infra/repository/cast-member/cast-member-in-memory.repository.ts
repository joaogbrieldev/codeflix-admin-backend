import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { InMemorySearchableRepository } from 'src/@shared/src/infra/db/in-memory/in-memory.repository';
import {
  CastMemberFilter,
  ICastMemberRepository,
} from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member.entity';

export class CastMemberInMemoryRepository
  extends InMemorySearchableRepository<CastMember, CastMemberId>
  implements ICastMemberRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: CastMember[],
    filter: CastMemberFilter | null,
  ): Promise<CastMember[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  getEntity(): new (...args: any[]) => CastMember {
    return CastMember;
  }

  protected applySort(
    items: CastMember[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
