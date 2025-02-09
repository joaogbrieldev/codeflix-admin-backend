import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { InMemorySearchableRepository } from 'src/@shared/src/infra/db/in-memory/in-memory.repository';
import {
  CategoryFilter,
  ICategoryRepository,
} from '../../../domain/contracts/repositories/category/category.repository';
import { Category, CategoryId } from '../../../domain/entities/category.entity';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, CategoryId>
  implements ICategoryRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Category[],
    filter: CategoryFilter | null,
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
    sort_dir: SortDirection | null,
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
