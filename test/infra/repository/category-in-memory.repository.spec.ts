import { Category } from "../../../src/domain/entities/category.entity";
import { CategoryInMemoryRepository } from "../../../src/infra/repository/category/category-in-memory.repository";

describe("CategoryInMemoryRepository", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  test("should no filter items when filter object is null", async () => {
    const items = [Category.create({ name: "Item 1" })];
    const filterSpy = jest.spyOn(items, "filter" as any);
    const itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  test("should filter items when filter object is not null", async () => {
    const items = [Category.create({ name: "Item 1" })];
    const filterSpy = jest.spyOn(items, "filter" as any);
    const itemsFiltered = await repository["applyFilter"](items, "Item 1");
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0]]);
  });

  test("should filter items when filter object is not null", async () => {
    const items = [
      Category.create({ name: "Item 1" }),
      Category.create({ name: "Item 2" }),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);
    const itemsFiltered = await repository["applyFilter"](items, "Item 2");
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  test("should filter items when filter object is null and return first to new Date", async () => {
    const created_at = new Date();
    const items = [
      Category.create({ name: "Item 1", created_at }),
      Category.create({
        name: "Item 1",
        created_at: new Date(created_at.getTime() + 100),
      }),
      Category.create({
        name: "Item 2",
        created_at: new Date(created_at.getTime() + 300),
      }),
    ];
    const itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });
});