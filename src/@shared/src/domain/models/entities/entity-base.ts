import IEntityBase from '../../contracts/entity/entity-base';
import { ValueObject } from '../../value-objects/value-object';

export abstract class EntityBase implements IEntityBase {
  abstract get entity_id(): ValueObject;
  abstract toJSON(): any;
}
