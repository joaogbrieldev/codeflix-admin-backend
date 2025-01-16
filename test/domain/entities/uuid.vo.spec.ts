import {
  InvalidUuidError,
  Uuid,
} from '../../../@shared/src/domain/value-objects/uuid.vo';

describe('UuidVo', () => {
  test('should throw error when uuid is invalid', () => {
    const uuid = 'invalid-uuid';
    expect(() => {
      new Uuid(uuid);
    }).toThrowError(new InvalidUuidError());
  });
  test('should recevs valid uuid', () => {
    const uuidFake = 'acde070d-8c4c-4f0d-9d8a-162843c10333';
    const uuid = new Uuid(uuidFake);
    expect(uuid.id).toStrictEqual(uuidFake);
  });
  test('should generate uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
  });
});
