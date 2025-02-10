import IRepositoryBase, {
  ISearchableRepository,
} from '../../../domain/contracts/infra/repository/repository-base';
import {
  SearchParams,
  SortDirection,
} from '../../../domain/contracts/infra/repository/search-params';
import { SearchResult } from '../../../domain/contracts/infra/repository/search-result';
import { NotFoundError } from '../../../domain/errors/not-found.error';
import { EntityBase } from '../../../domain/models/entities/entity-base';
import { ValueObject } from '../../../domain/value-objects/value-object';

export abstract class InMemoryRepository<
  E extends EntityBase,
  EntityId extends ValueObject,
> implements IRepositoryBase<E, EntityId>
{
  model: E[] = [];

  async create(entity: E): Promise<void> {
    this.model.push(entity);
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.model.findIndex((item) =>
      item.entity_id.equals(entity.entity_id),
    );
    if (indexFound === -1) {
      throw new NotFoundError(entity.entity_id, this.getEntity());
    }
    this.model[indexFound] = entity;
  }

  async delete(entity_id: EntityId): Promise<void> {
    const indexFound = this.model.findIndex((item) =>
      item.entity_id.equals(entity_id),
    );
    if (indexFound === -1) {
      throw new NotFoundError(entity_id, this.getEntity());
    }
    this.model.splice(indexFound, 1);
  }

  async findById(entity_id: EntityId): Promise<E | null> {
    const item = this.model.find((item) => item.entity_id.equals(entity_id));
    return typeof item === 'undefined' ? null : item;
  }

  async getAll(): Promise<any[]> {
    return this.model;
  }

  async findByIds(ids: EntityId[]): Promise<E[]> {
    //avoid to return repeated items
    return this.model.filter((entity) => {
      return ids.some((id) => entity.entity_id.equals(id));
    });
  }

  async existsById(
    ids: EntityId[],
  ): Promise<{ exists: EntityId[]; not_exists: EntityId[] }> {
    if (this.model.length === 0) {
      return {
        exists: [],
        not_exists: ids,
      };
    }

    const existsId = new Set<EntityId>();
    const notExistsId = new Set<EntityId>();
    ids.forEach((id) => {
      const item = this.model.find((entity) => entity.entity_id.equals(id));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      item ? existsId.add(id) : notExistsId.add(id);
    });
    return {
      exists: Array.from(existsId.values()),
      not_exists: Array.from(notExistsId.values()),
    };
  }

  abstract getEntity(): new (...args: any[]) => E;
}

export abstract class InMemorySearchableRepository<
    E extends EntityBase,
    EntityId extends ValueObject,
    Filter = string,
  >
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(entity: E): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<E[]> {
    throw new Error('Method not implemented.');
  }
  sortableFields: string[] = [];
  async search(props: SearchParams<Filter>): Promise<SearchResult<E>> {
    const modelFiltered = await this.applyFilter(this.model, props.filter);
    const itemsSorted = this.applySort(
      modelFiltered,
      props.sort,
      props.sort_dir,
    );
    const itemsPaginated = this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page,
    );
    return new SearchResult({
      items: itemsPaginated,
      total: modelFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: Filter | null,
  ): Promise<E[]>;

  protected applyPaginate(
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page'],
  ) {
    const start = (page - 1) * per_page; // 0 * 15 = 0
    const limit = start + per_page; // 0 + 15 = 15
    return items.slice(start, limit);
  }

  protected applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirection | null,
    custom_getter?: (sort: string, item: E) => any,
  ) {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      const aValue = custom_getter ? custom_getter(sort, a) : a[sort];
      const bValue = custom_getter ? custom_getter(sort, b) : b[sort];
      if (aValue < bValue) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sort_dir === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }
}
