import { PaginationOutput } from 'src/@shared/src/data/pagination-output';
import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { IUseCase } from 'src/@shared/src/domain/use-cases/use-case';
import { CategoryOutput } from 'src/core/data/use-cases/category/common/category-output';
import { CategoryFilter } from '../../../repositories/category.repository';

export type ListCategoriesInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>;

export abstract class IListCategoriesUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  abstract execute(input: ListCategoriesInput): Promise<ListCategoriesOutput>;
}
