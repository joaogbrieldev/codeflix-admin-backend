import { Uuid } from "../../../../@shared/src/domain/value-objects/uuid.vo";
import { Category } from "../../../domain/entities/category.entity";
import { CategoryModel } from "../../db/postgres/category/category.model";


export class CategoryModelMapper {
  static toModel(entity: Category): CategoryModel {
    return CategoryModel.build({
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: CategoryModel): Category {
    const category = new Category({
      id: new Uuid(model.id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at,
      entity_id: model.id,
      toJSON() {
        
      },
    });
    return category;
  }
}