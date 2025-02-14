import { NotFoundError } from 'rxjs';
import { setupSequelize } from 'src/@shared/src/infra/test/helpers';
import { UpdateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/update-cast-member/update-cast-member.use-case';
import {
  CastMember,
  CastMemberId,
} from 'src/core/domain/entities/cast-member/cast-member.aggregate';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';
import {
  CastMemberModel,
  CastMemberSequelizeRepository,
} from 'src/core/infra/repository/cast-member/cast-member.repository';

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
      useCase.execute(
        new UpdateCastMemberInput({ id: castMemberId.id, name: 'fake' }),
      ),
    ).rejects.toThrow(new NotFoundError(castMemberId.id, CastMember));
  });

  it('should update a cast member', async () => {
    const entity = CastMember.fake().anActor().build();
    await repository.create(entity);

    let output = await useCase.execute(
      new UpdateCastMemberInput({
        id: entity.cast_member_id.id,
        name: 'test',
        type: CastMemberTypeEnum.ACTOR,
      }),
    );
    expect(output).toStrictEqual({
      id: entity.cast_member_id.id,
      name: 'test',
      type: CastMemberTypeEnum.ACTOR,
      created_at: entity.created_at,
    });

    type Arrange = {
      input: {
        id: string;
        name: string;
        type: CastMemberTypeEnum;
      };
      expected: {
        id: string;
        name: string;
        type: CastMemberTypeEnum;
        created_at: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.cast_member_id.id,
          name: 'test',
          type: CastMemberTypeEnum.DIRECTOR,
        },
        expected: {
          id: entity.cast_member_id.id,
          name: 'test',
          type: CastMemberTypeEnum.DIRECTOR,
          created_at: entity.created_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        name: i.input.name,
        type: i.input.type,
      });
      const entityUpdated = await repository.findById(
        new CastMemberId(i.input.id),
      );
      expect(output).toStrictEqual({
        id: entity.cast_member_id.id,
        name: i.expected.name,
        type: i.expected.type,
        created_at: i.expected.created_at,
      });
      expect(entityUpdated!.toJSON()).toStrictEqual({
        cast_member_id: entity.cast_member_id.id,
        name: i.expected.name,
        type: i.expected.type,
        created_at: i.expected.created_at,
      });
    }
  });
});
