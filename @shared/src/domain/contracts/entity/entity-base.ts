import Uuid from "../../value-objects/uuid.vo";

export default interface IEntityBase {
  id?: Uuid;
  created_at?: Date;
  updated_at?: Date;
}
