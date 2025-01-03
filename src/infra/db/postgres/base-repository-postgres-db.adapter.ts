import IEntityBase from "../../../../@shared/src/domain/contracts/entity/entity-base";
import IRepositoryBase from "../../../../@shared/src/domain/contracts/infra/repository/repository-base";
import { ValueObject } from "../../../../@shared/src/domain/value-objects/value-object";

export class PostgresRepositoryAdapter<DomainModel extends IEntityBase, EntityId extends ValueObject> implements IRepositoryBase<DomainModel, EntityId>{
  create(entity: DomainModel): Promise<void> {
    throw new Error()
  }
  findById(id: EntityId): Promise<DomainModel> {
    throw new Error()

  }
  update(entity: DomainModel): Promise<void> {
    throw new Error()
  }
  getAll(): Promise<DomainModel[]> {
    throw new Error()
  }
  delete(id: EntityId): Promise<void> {
    throw new Error()
  }

}