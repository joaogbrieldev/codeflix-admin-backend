import { Category } from "../../../src/domain/entities/category.entity";

describe("CategotyEntity", () => {
  test("Should be create a new Categoty", () => {
    const categoryCreated: Category = new Category({
      id: "1234-5678-91011",
      name: "Fic",
    });
    const categoryMethod = Category.create(categoryCreated);
    expect(categoryMethod).toStrictEqual(categoryCreated);
  });

  test("Should be get entity Id", () => {
    const category: Category = new Category({
      id: "1234-5678-91011",
      name: "Fic",
    });

    expect(category.entity_id).toStrictEqual(category.id);
  });

  test("Should be changeName", () => {
    const category: Category = new Category({
      id: "1234-5678-91011",
      name: "Fic",
    });
    category.changeName("Terror");
    expect(category.name).toStrictEqual("Terror");
  });

  test("Should be changeDescription", () => {
    const category: Category = new Category({
      id: "1234-5678-91011",
      name: "Fic",
      description: "Any",
    });
    category.changeDescription("Very Great");
    expect(category.description).toStrictEqual("Very Great");
  });

  test("Should be activate", () => {
    const category: Category = new Category({
      id: "1234-5678-91011",
      name: "Fic",
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toStrictEqual(true);
  });
  test("Should be deactivate", () => {
    const category: Category = new Category({
      id: "1234-5678-91011",
      name: "Fic",
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toStrictEqual(false);
  });

  test("Should be return JSON Format", () => {
    const category: Category = new Category({
      id: "1234-5678-91011",
      name: "Fic",
      is_active: true,
    });
    expect(category.toJSON()).toStrictEqual({
      id: "1234-5678-91011",
      name: "Fic",
      is_active: true,
      created_at: undefined,
      description: undefined,
    });
  });
});
