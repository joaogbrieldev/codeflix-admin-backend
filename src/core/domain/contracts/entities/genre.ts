import IEntityBase from 'src/@shared/src/domain/contracts/entity/entity-base';
import { CategoryId } from '../../entities/category.aggregate';
import { GenreId } from '../../entities/genre/genre.aggregate';

export interface IGenre extends IEntityBase {
  genre_id: GenreId;
  name: string;
  categories_id: Map<string, CategoryId>;
  is_active: boolean;
  created_at: Date;
}
