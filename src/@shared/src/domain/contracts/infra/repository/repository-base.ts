import { EntityBase } from 'src/@shared/src/domain/models/entities/entity-base';
import { ValueObject } from 'src/@shared/src/domain/value-objects/value-object';
import IEntityBase from '../../entity/entity-base';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export default abstract class IRepositoryBase<
  DomainModel extends IEntityBase,
  EntityId extends ValueObject,
> {
  abstract create(entity: DomainModel): Promise<void>;
  abstract update(entity: DomainModel): Promise<void>;
  abstract delete(id: EntityId): Promise<void>;
  abstract findById(id: EntityId): Promise<DomainModel | null>;
  abstract getAll(): Promise<DomainModel[]>;
}

export interface ISearchableRepository<
  E extends EntityBase,
  EntityId extends ValueObject,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult,
> extends IRepositoryBase<E, EntityId> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
