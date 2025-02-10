import { Uuid } from 'src/@shared/src/domain/value-objects/uuid.vo';
import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { CreateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/create-cast-member/create-cast-member.use-case';
import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import { ICreateCastMemberUseCase } from 'src/core/domain/contracts/use-cases/cast-member/create-cast-member';
import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';
import { CastMemberSequelizeRepository } from 'src/core/infra/repository/cast-member/cast-member.repository';
import { CastMemberFakeBuilder } from 'src/test/fake-builders/cast-member.fake-builder';

describe('CreateCastMemberUseCase Integration Test', () => {
  setupSequelize({ models: [CastMemberModel] });
  let repository: ICastMemberRepository;
  let usecase: ICreateCastMemberUseCase;
  beforeEach(() => {
    repository = new CastMemberSequelizeRepository(CastMemberModel);
    usecase = new CreateCastMemberUseCase(repository);
  });
  test('should be create a CastMember', async () => {
    jest.spyOn(repository, 'create');
    const input = CastMemberFakeBuilder.aCastMember().build();
    input.created_at = new Date();
    const execute = await usecase.execute(input);
    const entity = await repository.findById(new Uuid(input.castMemberId.id));
    expect(execute).toStrictEqual({
      id: entity?.castMemberId.id,
      name: entity?.name,
      type: entity?.type,
      created_at: entity?.created_at,
    });
    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});
