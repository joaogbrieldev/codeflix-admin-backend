import IEntityBase from "../../../domain/contracts/entity/entity-base";
import IRepositoryBase from "../../../domain/contracts/infra/repository/repository-base";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { Uuid } from "../../../domain/value-objects/uuid.vo";

export abstract class InMemoryRepository<
  DomainModel extends IEntityBase,
  EntityId extends Uuid
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
