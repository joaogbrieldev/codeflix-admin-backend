import IEntityBase from "../../contracts/entity/entity-base";
import { Uuid } from "../../value-objects/uuid.vo";
import { ValueObject } from "../../value-objects/value-object";

export abstract class EntityBase implements IEntityBase {
  id?: Uuid;
  createdAt?: Date;
  updatedAt?: Date;

  abstract get entity_id(): ValueObject;
  abstract toJSON(): any;
}
