
import IEntityBase from "../../../domain/contracts/entity/entity-base";
import IRepositoryBase from "../../../domain/contracts/infra/repository/repository-base";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import ValueObject from "../../../domain/value-objects/value-object";


export abstract class InMemoryRepository<DomainModel extends IEntityBase, EntityId extends ValueObject> extends IRepositoryBase<DomainModel, EntityId>{
  protected model: DomainModel[] = [];

  async create(entity: DomainModel): Promise<void>{
    this.model.push(entity)
  };
  async update(entity: DomainModel): Promise<void>{
    const indexFound = this.model.findIndex((item) => item.entity_id.equals(entity.entity_id))
    if (indexFound === -1){
      throw new NotFoundError(entity.entity_id, this.getEntity())
    }
    this.model[indexFound] = entity

  };
  async delete(entity_id: EntityId): Promise<void>{
    const indexFound = this.model.findIndex((item) => item.entity_id.equals(entity_id))
    if (indexFound === -1){
      throw new NotFoundError(entity_id, this.getEntity())
    }
    this.model.splice(indexFound, 1);
  };
  async findById(entity_id: EntityId): Promise<DomainModel | null>{
    return this._get(entity_id)
  };
  async getAll(): Promise<DomainModel[]>{
    return this.model;
  };

  protected _get(entity_id: EntityId){
    const item = this.model.find((item) => item.entity_id.equals(entity_id))
    return typeof item === "undefined" ? null : item;
  }

  abstract getEntity(): new (...args: any[]) => DomainModel;
}