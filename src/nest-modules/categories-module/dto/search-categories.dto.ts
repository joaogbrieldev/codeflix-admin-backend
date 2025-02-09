import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { CategoryFilter } from 'src/core/domain/contracts/repositories/category/category.repository';
import { ListCategoriesInput } from 'src/core/domain/contracts/use-cases/category/list-categories/list-categories';

export class SearchCategoriesDto implements ListCategoriesInput {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection;
  filter?: CategoryFilter;
}
