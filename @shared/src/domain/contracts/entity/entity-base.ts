import { Uuid } from "../../value-objects/uuid.vo";
import { ValueObject } from "../../value-objects/value-object";


export default interface IEntityBase {
  id?: Uuid;
  created_at?: Date;
  updated_at?: Date;
  
  get entity_id(): ValueObject;
  toJSON(): any;

}
