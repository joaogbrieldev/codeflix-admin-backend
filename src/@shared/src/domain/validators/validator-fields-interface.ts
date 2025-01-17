export type FieldsErrors = {
  [field: string]: string[];
};

export interface IValidatorFields<PropsValidated> {
  validate(data: any): boolean;
  errors: FieldsErrors | null;
  validatedData: PropsValidated | null;
}
