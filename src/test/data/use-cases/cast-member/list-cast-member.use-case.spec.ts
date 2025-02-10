import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';

import { CastMemberSequelizeRepository } from 'src/core/infra/repository/cast-member/cast-member.repository';
import { CastMemberFakeBuilder } from 'src/test/fake-builders/cast-member.fake-builder';

describe('listCastMemberUseCase Integration Test', () => {
  setupSequelize({ models: [CastMemberModel] });
  let repository: ICastMemberRepository;

  beforeEach(() => {
    repository = new CastMemberSequelizeRepository(CastMemberModel);
  });
  test('should be list categories', async () => {
    jest.spyOn(repository, 'getAll');
    const castMember1 = CastMemberFakeBuilder.aCastMember().build();
    const castMember2 = CastMemberFakeBuilder.aCastMember().build();
    repository.create(castMember1);
    repository.create(castMember2);
    const items = await repository.getAll();
    expect(items).toStrictEqual([castMember1, castMember2]);
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });
});
