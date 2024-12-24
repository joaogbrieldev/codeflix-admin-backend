import { IEntityBase } from "../contracts/entity/entity-base";

export class EntityBase implements IEntityBase {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

}