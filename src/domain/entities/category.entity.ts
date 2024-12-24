import { EntityBase } from "../../../@shared/domain/entity/entity-base";
import { ICategory } from "../contracts/entities/category";

export type CategoryConstructorProps = {
  id?: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryCreateCommand = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

export class Category extends EntityBase implements ICategory {
  id: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at: Date;

  constructor(props: ICategory) {
    super();
    Object.assign(this, props);
  }

  get entity_id(): string {
    return this.id;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string | null): void {
    this.description = description;
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
}
