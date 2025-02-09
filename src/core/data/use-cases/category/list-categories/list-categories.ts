import { PaginationOutputMapper } from 'src/@shared/src/data/pagination-output';

import {
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from 'src/core/domain/contracts/repositories/category/category.repository';
import {
  IListCategoriesUseCase,
  ListCategoriesInput,
  ListCategoriesOutput,
} from 'src/core/domain/contracts/use-cases/category/list-categories/list-categories';
import { CategoryOutputMapper } from '../common/category-output';

export class ListCategoriesUseCase implements IListCategoriesUseCase {
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return CategoryOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
