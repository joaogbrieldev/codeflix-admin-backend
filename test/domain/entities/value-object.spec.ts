import { ValueObject } from "../../../@shared/src/domain/value-objects/value-object";

describe("ValeuObject", () => {
  test("Should be verify if vo is null or undefined", () => {
    const valueObject = new ValueObject();
    const result = valueObject.equals(null);
    expect(result).toBeFalsy();
  });
  test("Should be return false if constructor name vo if not equais this", () => {
    class Cpf extends ValueObject {}
    const instance = new Cpf();
    const result = instance.equals(instance);
    expect(result).toBeTruthy();
  });
});
