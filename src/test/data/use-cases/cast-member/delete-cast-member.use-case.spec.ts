import { NotFoundError } from 'src/@shared/src/domain/errors/not-found.error';
import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { DeleteCastMemberUseCase } from 'src/core/data/use-cases/cast-member/delete-cast-member/delete-cast-member.use-case';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member/cast-member.aggregate';
import {
  CastMemberModel,
  CastMemberSequelizeRepository,
} from 'src/core/infra/repository/cast-member/cast-member.repository';
import { CastMemberFakeBuilder } from 'src/test/fake-builders/cast-member.fake-builder';

describe('DeleteCastMemberUseCase Integration Tests', () => {
  let useCase: DeleteCastMemberUseCase;
  let repository: CastMemberSequelizeRepository;

  setupSequelize({ models: [CastMemberModel] });

  beforeEach(() => {
    repository = new CastMemberSequelizeRepository(CastMemberModel);
    useCase = new DeleteCastMemberUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const castMemberId = new CastMemberId();
    await expect(() =>
      useCase.execute({ id: castMemberId.id }),
    ).rejects.toThrow(new NotFoundError(castMemberId.id, CastMember));
  });

  it('should delete a CastMember', async () => {
    const castMember = CastMemberFakeBuilder.aCastMember().build();
    await repository.create(castMember);
    await useCase.execute({
      id: castMember.cast_member_id.id,
    });
    await expect(
      repository.findById(castMember.cast_member_id),
    ).resolves.toBeNull();
  });
});
