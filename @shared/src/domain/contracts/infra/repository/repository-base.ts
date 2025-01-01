import ValueObject from "../../../value-objects/value-object";
import { IEntityBase } from "../../entity/entity-base";

export default abstract class IRepositoryBase<DomainModel extends IEntityBase, EntityId extends ValueObject> {
  abstract create(entity: DomainModel): Promise<void>;
  abstract update(id: EntityId, entity: DomainModel): Promise<DomainModel | null>;
  abstract delete(id: EntityId): Promise<void>;
  abstract findById(id: EntityId): Promise<DomainModel | null>;
  abstract getAll(): Promise<DomainModel[]>;
}