import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';
import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { GetCastMemberUseCase } from 'src/core/data/use-cases/cast-member/get-cast-member/get-cast-member.use-case';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member/cast-member.aggregate';

import {
  CastMemberModel,
  CastMemberSequelizeRepository,
} from 'src/core/infra/repository/cast-member/cast-member.repository';
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
    const cast_member_id = new CastMemberId();
    await expect(() =>
      useCase.execute({ id: cast_member_id.id }),
    ).rejects.toThrow(new NotFoundError(cast_member_id.id, CastMember));
  });

  it('should FindById a CastMember', async () => {
    const castMember = CastMemberFakeBuilder.aCastMember().build();
    await repository.create(castMember);
    const execute = await useCase.execute({
      id: castMember.cast_member_id.id,
    });
    expect(execute).toStrictEqual({
      id: castMember.cast_member_id.id,
      name: castMember.name,
      type: castMember.type,
      created_at: castMember.created_at,
    });
  });
});
