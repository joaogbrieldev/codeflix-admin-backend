import { IEntityBase } from "../../../domain/contracts/entity/entity-base";
import IRepositoryBase from "../../../domain/contracts/infra/repository/repository-base";
import ValueObject from "../../../domain/value-objects/value-object";

export class InMemoryRepository<DomainModel extends IEntityBase, EntityId extends ValueObject> extends IRepositoryBase<DomainModel, EntityId>{
  protected model: DomainModel[] = [];

  async create(entity: DomainModel): Promise<void>{
    this.model.push(entity)
  };
  async update(id: EntityId, entity: DomainModel): Promise<DomainModel | null>{
    throw new Error('method not implement')
  };
  async delete(id: EntityId): Promise<void>{
    const indexFound = this.model.findIndex((item) => item.entity_id.equals(id))
  };
  async findById(id: EntityId): Promise<DomainModel | null>{
    throw new Error('method not implement')
  };
  async getAll(): Promise<DomainModel[]>{
    return this.model;
  };
}