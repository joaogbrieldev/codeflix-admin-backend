import IRepositoryBase from "../../../../@shared/src/domain/contracts/infra/repository/repository-base";
import { ValueObject } from "../../../../@shared/src/domain/value-objects/value-object";
import { Category } from "../../entities/category.entity";

export abstract class ICategoryRepository extends IRepositoryBase<
  Category  ,
  ValueObject  
> {}
