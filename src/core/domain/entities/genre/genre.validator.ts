import { MaxLength } from 'class-validator';
import { ClassValidatorFields } from 'src/@shared/src/domain/validators/class-validators-fields';
import { Notification } from 'src/@shared/src/domain/validators/notification';
import { Genre } from './genre.aggregate';

export class GenreRules {
  @MaxLength(255, { groups: ['name'] })
  name: string;

  constructor(entity: Genre) {
    Object.assign(this, entity);
  }
}

export class GenreValidator extends ClassValidatorFields {
  validate(
    notification: Notification,
    data: Genre,
    fields?: string[],
  ): boolean {
    const newFields = fields?.length ? fields : ['name'];
    return super.validate(notification, new GenreRules(data), newFields);
  }
}

export class GenreValidatorFactory {
  static create() {
    return new GenreValidator();
  }
}

export default GenreValidatorFactory;
