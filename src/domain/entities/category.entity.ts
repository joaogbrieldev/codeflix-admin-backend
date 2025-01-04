import { EntityBase } from "../../../@shared/src/domain/models/entities/entity-base";
import { EntityValidationError } from "../../../@shared/src/domain/validators/validators.error";
import { Uuid } from "../../../@shared/src/domain/value-objects/uuid.vo";

import { ICategory } from "../contracts/entities/category";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructorProps = {
  id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends EntityBase implements ICategory {
  id: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at: Date;

  constructor(props: ICategory) {
    super();
    this.id = props.id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  get entity_id(): Uuid {
    return this.id;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string | null): void {
    this.description = description;
    Category.validate(this);
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create(entity);
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
