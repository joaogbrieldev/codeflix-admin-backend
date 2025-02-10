import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';
import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { GetCastMemberUseCase } from 'src/core/data/use-cases/cast-member/get-cast-member/get-cast-member.use-case';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member.entity';

import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';
import { CastMemberSequelizeRepository } from 'src/core/infra/repository/cast-member/cast-member.repository';
import { CastMemberFakeBuilder } from 'src/test/fake-builders/cast-member.fake-builder';

describe('GetCastMemberUseCase8691 Integration Tests', () => {
  let useCase: GetCastMemberUseCase;
  let repository: CastMemberSequelizeRepository;

  setupSequelize({ models: [CastMemberModel] });

  beforeEach(() => {
    repository = new CastMemberSequelizeRepository(CastMemberModel);
    useCase = new GetCastMemberUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const castMemberId = new CastMemberId();
    await expect(() =>
      useCase.execute({ id: castMemberId.id }),
    ).rejects.toThrow(new NotFoundError(castMemberId.id, CastMember));
  });

  it('should FindById a CastMember', async () => {
    const castMember = CastMemberFakeBuilder.aCastMember().build();
    await repository.create(castMember);
    const execute = await useCase.execute({
      id: castMember.castMemberId.id,
    });
    expect(execute).toStrictEqual({
      id: castMember.castMemberId.id,
      name: castMember.name,
      type: castMember.type,
      created_at: castMember.created_at,
    });
  });
});
