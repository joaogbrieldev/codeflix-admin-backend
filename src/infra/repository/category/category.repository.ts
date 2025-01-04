import { ValueObject } from "../../../../@shared/src/domain/value-objects/value-object";
import { ICategoryRepository } from "../../../domain/contracts/repositories/category.repository";
import { Category } from "../../../domain/entities/category.entity";
import { PostgresRepositoryAdapter } from "../../db/postgres/base-repository-postgres-db.adapter";

export class CategoryRepository
  extends PostgresRepositoryAdapter<Category, ValueObject>
  implements ICategoryRepository {}
