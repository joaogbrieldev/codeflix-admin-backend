import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryInputDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryInputDto) {}
