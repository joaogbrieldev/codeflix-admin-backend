import { EntityBase } from "../../../@shared/domain/entity/entity-base";
import { ICategory } from "../contracts/entities/category";

type CreateCategoryProps = {
  name: string;
  description: string;
  is_active: boolean;
}

export class Category extends EntityBase implements ICategory {
 name: string;
 description: string;
 is_active: boolean;

  constructor(props: ICategory) {
    super();
    Object.assign(this, props);
  }

  static create(props: CreateCategoryProps): Category{
    return new Category(props)
  }
}