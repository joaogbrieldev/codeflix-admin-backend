import { IEntityBase } from "../../../../@shared/src/domain/contracts/entity/entity-base";
import IRepositoryBase from "../../../../@shared/src/domain/contracts/infra/repository/repository";

export class PostgresRepositoryAdapter<DomainModel extends IEntityBase> implements IRepositoryBase<DomainModel>{}