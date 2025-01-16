import { NotFoundError } from '../../../../@shared/src/domain/errors/not-found.error';
import { EntityBase } from '../../../../@shared/src/domain/models/entities/entity-base';
import { Uuid } from '../../../../@shared/src/domain/value-objects/uuid.vo';
import { InMemoryRepository } from '../../../../@shared/src/infra/db/in-memory/in-memory.repository';

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends EntityBase {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  test('should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 100,
    });

    await repo.create(entity);

    expect(repo.model.length).toBe(1);
    expect(repo.model[0]).toBe(entity);
  });

  it('should returns all entities', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repo.create(entity);

    const entities = await repo.getAll();

    expect(entities).toStrictEqual([entity]);
  });

  it('should throws error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity),
    );
  });

  it('should updates an entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repo.create(entity);

    const entityUpdated = new StubEntity({
      entity_id: entity.entity_id,
      name: 'updated',
      price: 1,
    });
    await repo.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repo.model[0].toJSON());
  });

  it('should throws error on delete when entity not found', async () => {
    const uuid = new Uuid();
    await expect(repo.delete(uuid)).rejects.toThrow(
      new NotFoundError(uuid.id, StubEntity),
    );

    await expect(
      repo.delete(new Uuid('9366b7dc-2d71-4799-b91c-c64adb205104')),
    ).rejects.toThrow(
      new NotFoundError('9366b7dc-2d71-4799-b91c-c64adb205104', StubEntity),
    );
  });

  it('should deletes an entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repo.create(entity);

    await repo.delete(entity.entity_id);
    expect(repo.model).toHaveLength(0);
  });
});
