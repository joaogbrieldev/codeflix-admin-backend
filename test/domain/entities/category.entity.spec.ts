import { Category } from "../../../src/domain/entities/category.entity";

describe("CategotyEntity", () => {
  test("Should be create a new Categoty", () => {
    const categoryCreated: Category = new Category({
      name: "Fic",
      is_active: true,
    });
    const categoryMethod = Category.create(categoryCreated);
    expect(categoryMethod).toStrictEqual(categoryCreated);
  });

  test("Should be get entity Id", () => {
    const category: Category = new Category({
      name: "Fic",
      is_active: true,
    });

    expect(category.entity_id).toStrictEqual(category.category_id);
  });

  test("Should be changeName", () => {
    const category: Category = Category.create({
      name: "Fic",
      is_active: true,
    });
    category.changeName("Terror");
    expect(category.name).toStrictEqual("Terror");
  });

  test("Should be changeDescription", () => {
    const category: Category = new Category({
      name: "Fic",
      description: "Any",
      is_active: true,
    });
    category.changeDescription("Very Great");
    expect(category.description).toStrictEqual("Very Great");
  });

  test("Should be activate", () => {
    const category: Category = new Category({
      name: "Fic",
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toStrictEqual(true);
  });
  test("Should be deactivate", () => {
    const category: Category = new Category({
      name: "Fic",
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toStrictEqual(false);
  });

  test("Should be return JSON Format", () => {
    const category: Category = new Category({
      name: "Fic",
      is_active: true,
    });
    expect(category.toJSON()).toStrictEqual({
      category_id: category.category_id.id,
      name: "Fic",
      is_active: true,
      created_at: category.created_at,
      description: null,
    });
  });
});
