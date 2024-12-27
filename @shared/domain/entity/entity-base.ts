import { IEntityBase } from "../contracts/entity/entity-base";
import Uuid from "../value-objects/uuid.vo";

export class EntityBase implements IEntityBase {
  id?: Uuid;
  createdAt?: Date;
  updatedAt?: Date;

}