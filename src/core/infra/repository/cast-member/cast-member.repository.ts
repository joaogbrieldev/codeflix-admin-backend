import { Op, literal } from 'sequelize';

import {
  SearchParams,
  SortDirection,
} from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { SearchResult } from 'src/@shared/src/domain/contracts/infra/repository/search-result';
import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';
import { Uuid } from 'src/@shared/src/domain/value-objects/uuid.vo';
import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import { CastMember } from 'src/core/domain/entities/cast-member.entity';
import { CastMemberModel } from '../../db/postgres/cast-member/cast-member.model';
import { CastMemberModelMapper } from './cast-member.model-mapper';

export class CastMemberSequelizeRepository implements ICastMemberRepository {
  sortableFields: string[] = ['name', 'created_at'];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
    },
  };

  constructor(private castMemberModel: typeof CastMemberModel) {}

  async create(entity: CastMember): Promise<void> {
    const modelProps = CastMemberModelMapper.toModel(entity);
    await this.castMemberModel.create(modelProps.toJSON());
  }

  async bulkInsert(entities: CastMember[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      CastMemberModelMapper.toModel(entity).toJSON(),
    );
    await this.castMemberModel.bulkCreate(modelsProps);
  }

  async update(entity: CastMember): Promise<void> {
    const id = entity.castMemberId.id;

    const modelProps = CastMemberModelMapper.toModel(entity);
    const [affectedRows] = await this.castMemberModel.update(
      modelProps.toJSON(),
      {
        where: { cast_member_id: entity.castMemberId.id },
      },
    );

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async delete(cast_member_id: Uuid): Promise<void> {
    const id = cast_member_id.id;

    const affectedRows = await this.castMemberModel.destroy({
      where: { cast_member_id: id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async findByIds(ids: Uuid[]): Promise<CastMember[]> {
    const models = await this.castMemberModel.findAll({
      where: {
        cast_member_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    return models.map((m) => CastMemberModelMapper.toEntity(m));
  }

  async existsById(
    ids: Uuid[],
  ): Promise<{ exists: Uuid[]; not_exists: Uuid[] }> {
    if (!ids.length) {
      throw new Error('ids must be an array with at least one element');
    }

    const existsCastMemberModels = await this.castMemberModel.findAll({
      attributes: ['cast_member_id'],
      where: {
        cast_member_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    const existsCastMemberIds = existsCastMemberModels.map(
      (m) => new Uuid(m.cast_member_id),
    );
    const notExistsCastMemberIds = ids.filter(
      (id) => !existsCastMemberIds.some((e) => e.equals(id)),
    );
    return {
      exists: existsCastMemberIds,
      not_exists: notExistsCastMemberIds,
    };
  }

  async findById(entity_id: Uuid): Promise<CastMember | null> {
    const model = await this.castMemberModel.findByPk(entity_id.id);

    return model ? CastMemberModelMapper.toEntity(model) : null;
  }

  async getAll(): Promise<CastMember[]> {
    const models = await this.castMemberModel.findAll();
    return models.map((model) => {
      return CastMemberModelMapper.toEntity(model);
    });
  }

  async search(props: SearchParams): Promise<SearchResult<CastMember>> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { rows: models, count } = await this.castMemberModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? //? { order: [[props.sort, props.sort_dir]] }
          { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [['created_at', 'desc']] }),
      offset,
      limit,
    });
    return new SearchResult({
      items: models.map((model) => {
        return CastMemberModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.castMemberModel.sequelize!.getDialect() as 'mysql';
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  getEntity(): new (...args: any[]) => CastMember {
    return CastMember;
  }
}
