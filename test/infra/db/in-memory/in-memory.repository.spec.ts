import { NotFoundError } from "../../../../@shared/src/domain/errors/not-found.error";
import { EntityBase } from "../../../../@shared/src/domain/models/entities/entity-base";
import { Uuid } from "../../../../@shared/src/domain/value-objects/uuid.vo";

import { InMemoryRepository } from "../../../../@shared/src/infra/db/in-memory/in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends EntityBase {
  id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      id: this.id,
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

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });
  test("should be StubInMemoryRepository is a instance to InMemotyRepository", () => {
    expect(repository).toBeInstanceOf(InMemoryRepository);
  });

  test("should be StubInMemoryRepository create a new domain model ", async () => {
    const domainModel = new StubEntity({
      entity_id: new Uuid(),
      name: "João",
      price: 20,
    });
    await repository.create(domainModel);
    expect(repository.model.length).toStrictEqual(1);
  });

  test("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    const entityUpdated = new StubEntity({
      entity_id: entity.id,
      name: "updated",
      price: 1,
    });
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.model[0].toJSON());
  });

  test("should be throw error if id is invalid when updated", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    const entityUpdated = new StubEntity({
      entity_id: new Uuid(),
      name: "updated",
      price: 1,
    });

    await expect(repository.update(entityUpdated)).rejects.toThrow(
      new NotFoundError(entityUpdated.id, repository.getEntity())
    );
  });

  test("should be throw error if id is invalid when deleted", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    const entityUpdated = new StubEntity({
      entity_id: new Uuid(),
      name: "updated",
      price: 1,
    });

    await expect(repository.delete(entityUpdated.id)).rejects.toThrow(
      new NotFoundError(entityUpdated.id, repository.getEntity())
    );
  });

  test("should delete an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    await repository.delete(entity.id);
    expect(repository.model).toStrictEqual([]);
  });

  test("should findById an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    await repository.findById(entity.id);
    expect(repository.model[0]).toStrictEqual(entity);
  });

  test("should getAll entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    await repository.getAll();
    expect(repository.model[0]).toStrictEqual(entity);
    expect(repository.model.length).toStrictEqual(1);
  });
});
