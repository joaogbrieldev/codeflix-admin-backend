import { ISearchableRepository } from 'src/@shared/src/domain/contracts/infra/repository/repository-base';
import { SearchParams } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { SearchResult } from 'src/@shared/src/domain/contracts/infra/repository/search-result';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member.entity';

export type CastMemberFilter = string;

export class CastMemberSearchParams extends SearchParams<CastMemberFilter> {}

export class CastMemberSearchResult extends SearchResult<CastMember> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICastMemberRepository
  extends ISearchableRepository<
    CastMember,
    CastMemberId,
    CastMemberFilter,
    CastMemberSearchParams,
    CastMemberSearchResult
  > {}
