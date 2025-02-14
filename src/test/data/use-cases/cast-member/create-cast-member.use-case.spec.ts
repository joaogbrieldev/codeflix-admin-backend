import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { CreateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/create-cast-member/create-cast-member.use-case';
import { CastMemberId } from 'src/core/domain/entities/cast-member/cast-member.aggregate';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';
import {
  CastMemberModel,
  CastMemberSequelizeRepository,
} from 'src/core/infra/repository/cast-member/cast-member.repository';

describe('CreateCastMemberUseCase Integration Tests', () => {
  let useCase: CreateCastMemberUseCase;
  let repository: CastMemberSequelizeRepository;

  setupSequelize({ models: [CastMemberModel] });

  beforeEach(() => {
    repository = new CastMemberSequelizeRepository(CastMemberModel);
    useCase = new CreateCastMemberUseCase(repository);
  });

  it('should create a cast member', async () => {
    let output = await useCase.execute({
      name: 'test',
      type: CastMemberTypeEnum.ACTOR,
    });
    let entity = await repository.findById(new CastMemberId(output.id));
    expect(output).toStrictEqual({
      id: entity!.cast_member_id.id,
      name: 'test',
      type: CastMemberTypeEnum.ACTOR,
      created_at: entity!.created_at,
    });

    output = await useCase.execute({
      name: 'test',
      type: CastMemberTypeEnum.DIRECTOR,
    });
    entity = await repository.findById(new CastMemberId(output.id));
    expect(output).toStrictEqual({
      id: entity!.cast_member_id.id,
      name: 'test',
      type: CastMemberTypeEnum.DIRECTOR,
      created_at: entity!.created_at,
    });
  });
});
