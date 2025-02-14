import { getModelToken } from '@nestjs/sequelize';
import { CreateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/create-cast-member/create-cast-member.use-case';
import { DeleteCastMemberUseCase } from 'src/core/data/use-cases/cast-member/delete-cast-member/delete-cast-member.use-case';
import { GetCastMemberUseCase } from 'src/core/data/use-cases/cast-member/get-cast-member/get-cast-member.use-case';
import { ListCastMembersUseCase } from 'src/core/data/use-cases/cast-member/list-cast-members/list-cast-members';
import { UpdateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/update-cast-member/update-cast-member.use-case';
import { ICastMemberRepository } from 'src/core/domain/contracts/repositories/cast-member/cast-member.repository';
import { CastMemberInMemoryRepository } from 'src/core/infra/repository/cast-member/cast-member-in-memory.repository';
import {
  CastMemberModel,
  CastMemberSequelizeRepository,
} from 'src/core/infra/repository/cast-member/cast-member.repository';

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
    useFactory: (castMemberRepo: ICastMemberRepository) => {
      return new CreateCastMemberUseCase(castMemberRepo);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  UPDATE_CAST_MEMBER_USE_CASE: {
    provide: UpdateCastMemberUseCase,
    useFactory: (castMemberRepo: ICastMemberRepository) => {
      return new UpdateCastMemberUseCase(castMemberRepo);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  LIST_CAST_MEMBERS_USE_CASE: {
    provide: ListCastMembersUseCase,
    useFactory: (castMemberRepo: ICastMemberRepository) => {
      return new ListCastMembersUseCase(castMemberRepo);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  GET_CAST_MEMBER_USE_CASE: {
    provide: GetCastMemberUseCase,
    useFactory: (castMemberRepo: ICastMemberRepository) => {
      return new GetCastMemberUseCase(castMemberRepo);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
  DELETE_CAST_MEMBER_USE_CASE: {
    provide: DeleteCastMemberUseCase,
    useFactory: (castMemberRepo: ICastMemberRepository) => {
      return new DeleteCastMemberUseCase(castMemberRepo);
    },
    inject: [REPOSITORIES.CAST_MEMBER_REPOSITORY.provide],
  },
};

export const CAST_MEMBERS_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
