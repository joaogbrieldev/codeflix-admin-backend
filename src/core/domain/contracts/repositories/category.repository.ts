import { ISearchableRepository } from 'src/@shared/src/domain/contracts/infra/repository/repository-base';
import { SearchParams } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { SearchResult } from 'src/@shared/src/domain/contracts/infra/repository/search-result';
import { Category, CategoryId } from '../../entities/category.entity';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export interface ICategoryRepository
  extends ISearchableRepository<
    Category,
    CategoryId,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}
