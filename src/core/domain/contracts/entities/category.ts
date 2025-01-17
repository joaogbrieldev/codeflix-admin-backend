import IEntityBase from 'src/@shared/src/domain/contracts/entity/entity-base';

export interface ICategory extends IEntityBase {
  name: string;
  description?: string;
  is_active?: boolean;
}
