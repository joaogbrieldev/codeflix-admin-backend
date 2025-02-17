import { AggregateRoot } from 'src/@shared/src/domain/models/entities/aggregate-root';
import { Uuid } from 'src/@shared/src/domain/value-objects/uuid.vo';
import { ValueObject } from 'src/@shared/src/domain/value-objects/value-object';
import { CategoryId } from '../category.aggregate';

export class GenreId extends Uuid {}

export type GenreConstructorProps = {
  genre_id?: GenreId;
  name: string;
  categories_id: Map<string, CategoryId>;
  is_active?: boolean;
  created_at?: Date;
};

export type GenreCreateCommand = {
  name: string;
  categories_id: CategoryId[];
  is_active?: boolean;
};

export class Genre extends AggregateRoot {
  genre_id: GenreId;
  name: string;
  categories_id: Map<string, CategoryId>;
  is_active: boolean;
  created_at: Date;

  constructor(props: GenreConstructorProps) {
    super();
    this.genre_id = props.genre_id ?? new GenreId();
    this.name = props.name;
    this.categories_id = props.categories_id;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: GenreCreateCommand) {
    return new Genre({
      ...props,
      categories_id: new Map(
        props.categories_id.map((category_id) => [category_id.id, category_id]),
      ),
    });
  }

  changeName(name: string) {
    this.name = name;
  }

  activate() {
    this.is_active = true;
  }

  desactivate() {
    this.is_active = false;
  }

  addCategoryId(category_id: CategoryId) {
    return this.categories_id.set(category_id.id, category_id);
  }

  syncCategoriesId(categories_id: CategoryId[]) {
    if (categories_id.length) {
      throw new Error('Categories id is empty');
    }
    this.categories_id = new Map(
      categories_id.map((category_id) => [category_id.id, category_id]),
    );
  }

  toJSON() {
    return {
      genre_id: this.genre_id,
      name: this.name,
      categories_id: Array.from(this.categories_id.values()).map(
        (category_id) => category_id.id,
      ),
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }

  get entity_id(): ValueObject {
    return this.genre_id;
  }
}
