
import IRepository from "../../../../@shared/src/domain/contracts/infra/repository/repository";
import { Category } from "../../entities/category.entity";

export default abstract class ICategoryRepository extends IRepository<Category> {
}