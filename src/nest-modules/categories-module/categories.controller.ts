import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CategoryOutput } from 'src/core/data/use-cases/category/common/category-output';
import { ICreateCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/create/create-category';
import { CategoryPresenter } from './categories.presenter';
import { CreateCategoryInputDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  private _createCategoryUseCase: ICreateCategoryUseCase
  constructor() {}

  @Post('/')
  async create(@Body() createCategoryDto: CreateCategoryInputDto) {
    const output = await this._createCategoryUseCase.execute(createCategoryDto);
    return CategoriesController.serialize(output);
  }

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}

  static serialize(output: CategoryOutput){
    return new CategoryPresenter(output);
  }
}
