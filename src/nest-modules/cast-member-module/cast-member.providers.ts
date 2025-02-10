import { getModelToken } from '@nestjs/sequelize';
import { CreateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/create-cast-member/create-cast-member.use-case';
import { DeleteCastMemberUseCase } from 'src/core/data/use-cases/cast-member/delete-cast-member/delete-cast-member.use-case';
import { GetCastMemberUseCase } from 'src/core/data/use-cases/cast-member/get-cast-member/get-cast-member.use-case';
import { ListCastMembersUseCase } from 'src/core/data/use-cases/cast-member/list-cast-members/list-cast-members';
import { UpdateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/update-cast-member/update-cast-member.use-case';
import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';
import { CastMemberInMemoryRepository } from 'src/core/infra/repository/cast-member/cast-member-in-memory.repository';
import { CastMemberSequelizeRepository } from 'src/core/infra/repository/cast-member/cast-member.repository';

export const REPOSITORIES = {
  CAST_MEMBER_REPOSITORY: {
    provide: 'CastMemberRepository',
    useExisting: CastMemberSequelizeRepository,
  },
  CAST_MEMBER_IN_MEMORY_REPOSITORY: {
    provide: CastMemberInMemoryRepository,
    useClass: CastMemberInMemoryRepository,
  },
  CAST_MEMBER_SEQUELIZE_REPOSITORY: {
    provide: CastMemberSequelizeRepository,
    useFactory: (castMemberModel: typeof CastMemberModel) => {
      return new CastMemberSequelizeRepository(castMemberModel);
    },
    inject: [getModelToken(CastMemberModel)],
  },
};

export const USE_CASES = {
  CREATE_CAST_MEMBER_USE_CASE: {
    provide: CreateCastMemberUseCase,
    useFactory: (castMemberRepository: ICastMemberRepository) => {
      return new CreateCastMemberUseCase(castMemberRepository);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  UPDATE_CAST_MEMBER_USE_CASE: {
    provide: UpdateCastMemberUseCase,
    useFactory: (castMemberRepository: ICastMemberRepository) => {
      return new UpdateCastMemberUseCase(castMemberRepository);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  LIST_CATEGORIES_USE_CASE: {
    provide: ListCastMembersUseCase,
    useFactory: (castMemberRepository: ICastMemberRepository) => {
      return new ListCastMembersUseCase(castMemberRepository);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  GET_CAST_MEMBER_USE_CASE: {
    provide: GetCastMemberUseCase,
    useFactory: (castMemberRepository: ICastMemberRepository) => {
      return new GetCastMemberUseCase(castMemberRepository);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  DELETE_CAST_MEMBER_USE_CASE: {
    provide: DeleteCastMemberUseCase,
    useFactory: (castMemberRepository: ICastMemberRepository) => {
      return new DeleteCastMemberUseCase(castMemberRepository);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
};

export const CAST_MEMBER_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
