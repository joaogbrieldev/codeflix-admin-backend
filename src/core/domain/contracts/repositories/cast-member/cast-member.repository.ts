import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member/cast-member.aggregate';

import { ISearchableRepository } from 'src/@shared/src/domain/contracts/infra/repository/repository-base';

import {
  SearchParams as DefaultSearchParams,
  SearchParamsConstructorProps,
} from 'src/@shared/src/domain/contracts/infra/repository/search-params';

import { SearchResult as DefaultSearchResult } from 'src/@shared/src/domain/contracts/infra/repository/search-result';
import { Either } from 'src/@shared/src/domain/either';
import { SearchValidationError } from 'src/@shared/src/domain/validators/validators.error';
import {
  CastMemberType,
  CastMemberTypeEnum,
  InvalidCastMemberTypeError,
} from 'src/core/domain/types/cast-member.types';

export type CastMemberFilter = {
  name?: string | null;
  type?: CastMemberType | null;
};

export class CastMemberSearchParams extends DefaultSearchParams<CastMemberFilter> {
  private constructor(
    props: SearchParamsConstructorProps<CastMemberFilter> = {},
  ) {
    super(props);
  }

  static create(
    props: Omit<SearchParamsConstructorProps<CastMemberFilter>, 'filter'> & {
      filter?: {
        name?: string | null;
        type?: CastMemberTypeEnum | null;
      };
    } = {},
  ) {
    const [type, errorCastMemberType] = Either.of(props.filter?.type)
      .map((type) => type || null)
      .chain<CastMemberType | null, InvalidCastMemberTypeError>((type) =>
        type ? CastMemberType.create(type) : Either.of(null),
      )
      .asArray();

    if (errorCastMemberType) {
      const error = new SearchValidationError([
        { type: [errorCastMemberType.message] },
      ]);
      throw error;
    }

    return new CastMemberSearchParams({
      ...props,
      filter: {
        name: props.filter?.name,
        type: type,
      },
    });
  }

  get filter(): CastMemberFilter | null {
    return this._filter;
  }

  protected set filter(value: CastMemberFilter | null) {
    const _value =
      !value || (value as unknown) === '' || typeof value !== 'object'
        ? null
        : value;

    const filter = {
      ...(_value && _value.name && { name: `${_value?.name}` }),
      ...(_value && _value.type && { type: _value.type }),
    };

    this._filter = Object.keys(filter).length === 0 ? null : filter;
  }
}

export class CastMemberSearchResult extends DefaultSearchResult<CastMember> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICastMemberRepository
  extends ISearchableRepository<
    CastMember,
    CastMemberId,
    CastMemberFilter,
    CastMemberSearchParams,
    CastMemberSearchResult
  > {}
