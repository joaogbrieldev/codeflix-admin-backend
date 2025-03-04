import { CastMemberId } from '@core/cast-member/domain/cast-member.aggregate';
import { CategoryId } from '@core/category/domain/category.aggregate';
import { GenreId } from '@core/genre/domain/genre.aggregate';
import { AggregateRoot } from '@core/shared/domain/aggregate-root';
import { ValueObject } from '@core/shared/domain/value-object';
import { Uuid } from '@core/shared/domain/value-objects/uuid.vo';

export type VideoConstructorProps = {
  video_id?: VideoId;
  title: string;
  description: string;
  year_launched: number;
  duration: number;
  is_opened: boolean;
  is_published: boolean;
  categories_id: Map<string, CategoryId>;
  genres_id: Map<string, GenreId>;
  cast_members_id: Map<string, CastMemberId>;
  created_at?: Date;
};

export type VideoCreateCommand = {
  title: string;
  description: string;
  year_launched: number;
  duration: number;
  is_opened: boolean;
  categories_id: CategoryId[];
  genres_id: GenreId[];
  cast_members_id: CastMemberId[];
};

export class VideoId extends Uuid {}

export class Video extends AggregateRoot {
  video_id: VideoId;
  title: string;
  description: string;
  year_launched: number;
  duration: number;
  is_opened: boolean;
  is_published: boolean;
  categories_id: Map<string, CategoryId>;
  genres_id: Map<string, GenreId>;
  cast_members_id: Map<string, CastMemberId>;
  created_at?: Date;

  constructor(props: VideoConstructorProps) {
    super();
    this.video_id = props.video_id ?? new VideoId();
    this.title = props.title;
    this.description = props.description;
    this.year_launched = props.year_launched;
    this.duration = props.duration;
    this.is_opened = props.is_opened;
    this.is_published = props.is_published;
    this.categories_id = props.categories_id;
    this.genres_id = props.genres_id;
    this.cast_members_id = props.cast_members_id;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: VideoCreateCommand) {
    const video = new Video({
      ...props,
      categories_id: new Map(props.categories_id.map((id) => [id.id, id])),
      genres_id: new Map(props.genres_id.map((id) => [id.id, id])),
      cast_members_id: new Map(props.cast_members_id.map((id) => [id.id, id])),
      is_published: false,
    });
    return video;
  }

  changeTitle(title: string): void {
    this.title = title;
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  changeYearLaunched(year_launched: number): void {
    this.year_launched = year_launched;
  }

  changeDuration(duration: number): void {
    this.duration = duration;
  }

  markAsOpened(): void {
    this.is_opened = true;
  }

  markAsNotOpened(): void {
    this.is_opened = false;
  }

  addCategoryId(categoryId: CategoryId): void {
    this.categories_id.set(categoryId.id, categoryId);
  }

  removeCategoryId(categoryId: CategoryId): void {
    this.categories_id.delete(categoryId.id);
  }

  syncCategoriesIds(categoriesIds: CategoryId[]): void {
    if (!categoriesIds.length) {
      throw new Error('Categories id is empty');
    }
    this.categories_id = new Map(categoriesIds.map((id) => [id.id, id]));
  }

  addGenreId(genresId: GenreId): void {
    this.genres_id.set(genresId.id, genresId);
  }

  removeGenreId(genresId: GenreId): void {
    this.genres_id.delete(genresId.id);
  }

  syncGenresIds(genresIds: GenreId[]): void {
    if (!genresIds.length) {
      throw new Error('Categories id is empty');
    }
    this.genres_id = new Map(genresIds.map((id) => [id.id, id]));
  }

  addCastMemberId(castMemberId: CastMemberId): void {
    this.cast_members_id.set(castMemberId.id, castMemberId);
  }

  removeCastMemberId(castMemberId: CastMemberId): void {
    this.cast_members_id.delete(castMemberId.id);
  }

  syncCastMemberIds(castMemberIds: CastMemberId[]): void {
    if (!castMemberIds.length) {
      throw new Error('Categories id is empty');
    }
    this.cast_members_id = new Map(castMemberIds.map((id) => [id.id, id]));
  }

  get entity_id(): ValueObject {
    return this.video_id;
  }

  toJSON() {
    return {
      video_id: this.video_id.id,
      title: this.title,
      description: this.description,
      year_launched: this.year_launched,
      duration: this.duration,
      is_opened: this.is_opened,
      is_published: this.is_published,
      categories_id: Array.from(this.categories_id.values()).map((id) => id.id),
      genres_id: Array.from(this.genres_id.values()).map((id) => id.id),
      cast_members_id: Array.from(this.cast_members_id.values()).map(
        (id) => id.id,
      ),
      created_at: this.created_at,
    };
  }
}
