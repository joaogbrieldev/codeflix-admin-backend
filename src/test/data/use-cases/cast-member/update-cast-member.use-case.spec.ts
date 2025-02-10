import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';
import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { UpdateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/update-cast-member/update-cast-member.use-case';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member.entity';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';
import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';
import { CastMemberSequelizeRepository } from 'src/core/infra/repository/cast-member/cast-member.repository';

describe('UpdateCastMemberUseCase Integration Tests', () => {
  let useCase: UpdateCastMemberUseCase;
  let repository: CastMemberSequelizeRepository;

  setupSequelize({ models: [CastMemberModel] });

  beforeEach(() => {
    repository = new CastMemberSequelizeRepository(CastMemberModel);
    useCase = new UpdateCastMemberUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const castMemberId = new CastMemberId();
    await expect(() =>
      useCase.execute({ id: castMemberId.id }),
    ).rejects.toThrow(new NotFoundError(castMemberId.id, CastMember));
  });

  it('should Update a CastMember', async () => {
    const castMember = new CastMember({
      name: 'name 1',
      type: CastMemberTypeEnum.actor,
    });
    const castMemberUpdated = new CastMember({
      name: 'name 2',
      type: CastMemberTypeEnum.director,
    });
    await repository.create(castMember);
    castMember.changeName(castMemberUpdated.name);
    const execute = await useCase.execute({
      id: castMember.castMemberId.id,
      name: castMemberUpdated.name,
      type: castMemberUpdated.type,
    });
    expect(execute).toStrictEqual({
      id: castMember.castMemberId.id,
      name: castMemberUpdated.name,
      type: castMemberUpdated.type,
      created_at: castMember.created_at,
    });
  });
});
