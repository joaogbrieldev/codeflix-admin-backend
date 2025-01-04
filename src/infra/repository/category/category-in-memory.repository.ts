import { SortDirection } from "../../../../@shared/src/domain/contracts/infra/repository/search-params";
import { Uuid } from "../../../../@shared/src/domain/value-objects/uuid.vo";
import { InMemorySearchableRepository } from "../../../../@shared/src/infra/db/in-memory/in-memory.repository";
import { ICategoryRepository } from "../../../domain/contracts/repositories/category.repository";
import { Category } from "../../../domain/entities/category.entity";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, Uuid>
  implements ICategoryRepository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter: string | null
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  protected applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, "created_at", "desc");
  }
}
