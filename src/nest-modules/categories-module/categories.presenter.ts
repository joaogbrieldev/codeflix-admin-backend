import { CategoryOutput } from "src/core/data/use-cases/category/common/category-output";

export class CategoryPresenter {
  id: string;
  name: string;
  descriprion?: string | null;
  created_ar: Date;

  constructor(output: CategoryOutput){
    this.id = output.id
  }
}