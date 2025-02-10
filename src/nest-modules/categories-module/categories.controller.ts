import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CategoryOutput } from 'src/core/data/use-cases/category/common/category-output';
import { CreateCategoryUseCase } from 'src/core/data/use-cases/category/create-category/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/data/use-cases/category/delete-category/delete-category.use-case';
import { GetCategoryUseCase } from 'src/core/data/use-cases/category/get-category/get-category.use-case';
import { ListCategoriesUseCase } from 'src/core/data/use-cases/category/list-categories/list-categories';
import { UpdateCategoryUseCase } from 'src/core/data/use-cases/category/update-category/update-category.use-case';
import { ICreateCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/create/create-category';
import { IDeleteCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/delete/delete-category.use-case';
import { IGetCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/get-category/get-category';
import { IListCategoriesUseCase } from 'src/core/domain/contracts/use-cases/category/list-categories/list-categories';
import {
  IUpdateCategoryInput,
  IUpdateCategoryUseCase,
} from 'src/core/domain/contracts/use-cases/category/update/update-category';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './categories.presenter';
import { CreateCategoryInputDto } from './dtos/create-category.dto';
import { SearchCategoriesDto } from './dtos/search-categories.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private _createCategoryUseCase: ICreateCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private _updateCategoryUseCase: IUpdateCategoryUseCase;

  @Inject(DeleteCategoryUseCase)
  private _deleteCategoryUseCase: IDeleteCategoryUseCase;

  @Inject(GetCategoryUseCase)
  private _findByIdCategoryUseCase: IGetCategoryUseCase;

  @Inject(ListCategoriesUseCase)
  private _getAllCategories: IListCategoriesUseCase;

  constructor() {}

  @Post('/')
  async create(@Body() createCategoryDto: CreateCategoryInputDto) {
    const output = await this._createCategoryUseCase.execute(createCategoryDto);
    return CategoriesController.serialize(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this._findByIdCategoryUseCase.execute({ id });
    return CategoriesController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchCategoriesDto) {
    const output = await this._getAllCategories.execute(searchParamsDto);
    return new CategoryCollectionPresenter(output);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateCategoryDto: IUpdateCategoryInput,
  ) {
    const output = await this._updateCategoryUseCase.execute({
      ...updateCategoryDto,
      id,
    });
    return CategoriesController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    await this._deleteCategoryUseCase.execute({ id });
  }

  static serialize(output: CategoryOutput) {
    return new CategoryPresenter(output);
  }
}
