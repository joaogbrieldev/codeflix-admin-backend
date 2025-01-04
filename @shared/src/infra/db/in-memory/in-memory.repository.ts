import IEntityBase from "../../../domain/contracts/entity/entity-base";
import IRepositoryBase from "../../../domain/contracts/infra/repository/repository-base";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { EntityBase } from "../../../domain/models/entities/entity-base";
import { Uuid } from "../../../domain/value-objects/uuid.vo";
import { ValueObject } from "../../../domain/value-objects/value-object";

export abstract class InMemoryRepository<
  DomainModel extends IEntityBase,
  EntityId extends ValueObject
> extends IRepositoryBase<DomainModel, EntityId> {
  model: DomainModel[] = [];

  async create(entity: DomainModel): Promise<void> {
    this.model.push(entity);
  }
  async update(entity: DomainModel): Promise<void> {
    const indexFound = this.model.findIndex((item) =>
      item.id.equals(entity.id)
    );
    if (indexFound === -1) {
      throw new NotFoundError(entity.id, this.getEntity());
    }
    this.model[indexFound] = entity;
  }
  async delete(id: EntityId): Promise<void> {
    const indexFound = this.model.findIndex((item) => item.id.equals(id));
    if (indexFound === -1) {
      throw new NotFoundError(id, this.getEntity());
    }
    this.model.splice(indexFound, 1);
  }
  async findById(id: EntityId): Promise<DomainModel | null> {
    return this._get(id);
  }
  async getAll(): Promise<DomainModel[]> {
    return this.model;
  }

  protected _get(id: EntityId) {
    const item = this.model.find((item) => item.id.equals(id));
    return typeof item === "undefined" ? null : item;
  }

  abstract getEntity(): new (...args: any[]) => DomainModel;
}

export abstract class InMemorySearchableRepository<
    DomainModel extends IEntityBase,
    EntityId extends Uuid,
    Filter = string
  >
  extends InMemoryRepository<DomainModel, EntityId>
  implements ISearchableRepository<DomainModel, EntityId, Filter>
{
  sortableFields: string[] = [];
  async search(props: SearchParams<Filter>): Promise<SearchResult<EntityBase>> {
    const itemsFiltered = await this.applyFilter(this.model, props.filter);
    const itemsSorted = this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    );
    const itemsPaginate = this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    );
    return new SearchResult({
      items: itemsPaginate,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
    });
  }

  protected abstract applyFilter(
    items: EntityBase[],
    filter: Filter | null
  ): Promise<EntityBase[]>;

  protected applyPaginate(
    items: EntityBase[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ) {
    const start = (page - 1) * per_page; // 0 * 15 = 0
    const limit = start + per_page; // 0 + 15 = 15
    return items.slice(start, limit);
  }

  protected applySort(
    items: EntityBase[],
    sort: string | null,
    sort_dir: SortDirection | null,
    custom_getter?: (sort: string, item: EntityBase) => any
  ) {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      const aValue = custom_getter ? custom_getter(sort, a) : a[sort];
      const bValue = custom_getter ? custom_getter(sort, b) : b[sort];
      if (aValue < bValue) {
        return sort_dir === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sort_dir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }
}
