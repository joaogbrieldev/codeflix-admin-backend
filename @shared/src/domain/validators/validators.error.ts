import { FieldsErrors } from './validator-fields-interface';

export class EntityValidationError extends Error {
  constructor(
    public errors: FieldsErrors,
    message = 'Validation Errors',
  ) {
    super(message);
  }
  count() {
    return Object.keys(this.errors).length;
  }
}
