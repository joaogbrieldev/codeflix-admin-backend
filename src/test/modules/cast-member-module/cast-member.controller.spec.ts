import { SortDirection } from 'src/@shared/src/domain/contracts/infra/repository/search-params';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';
import { ListCastMembersOutput } from 'src/core/domain/contracts/use-cases/cast-member/list-cast-members';
import { IUpdateCastMemberInput } from 'src/core/domain/contracts/use-cases/cast-member/update-cast-member';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';
import { CastMembersController } from 'src/nest-modules/cast-member-module/cast-member.controller';
import {
  CastMemberCollectionPresenter,
  CastMemberPresenter,
} from 'src/nest-modules/cast-member-module/cast-member.presenter';
import { CreateCastMemberInputDto } from 'src/nest-modules/cast-member-module/dtos/create-cast-member.dto';

describe('CastMemberController Unit Tests', () => {
  let controller: CastMembersController;

  beforeEach(async () => {
    controller = new CastMembersController();
  });

  it('should creates a cast-member', async () => {
    //Arrange
    const output: CastMemberOutput = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Movie',
      type: CastMemberTypeEnum.actor,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    controller['_createCastMemberUseCase'] = mockCreateUseCase;
    const input: CreateCastMemberInputDto = {
      name: 'Movie',
      type: CastMemberTypeEnum.actor,
    };

    //Act
    const presenter = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(CastMemberPresenter);
    expect(presenter).toStrictEqual(new CastMemberPresenter(output));
  });

  it('should updates a CastMember', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: CastMemberOutput = {
      id,
      name: 'Movie',
      type: CastMemberTypeEnum.actor,
      created_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    controller['_updateCastMemberUseCase'] = mockUpdateUseCase;
    const input: IUpdateCastMemberInput = {
      id: output.id,
      name: 'Movie',
      type: CastMemberTypeEnum.actor,
    };
    const presenter = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(CastMemberPresenter);
    expect(presenter).toStrictEqual(new CastMemberPresenter(output));
  });

  it('should deletes a CastMember', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['_deleteCastMemberUseCase'] = mockDeleteUseCase;
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a CastMember', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: CastMemberOutput = {
      id,
      name: 'Movie',
      type: CastMemberTypeEnum.actor,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    controller['_getCastMemberUseCase'] = mockGetUseCase;
    const presenter = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toBeInstanceOf(CastMemberPresenter);
    expect(presenter).toStrictEqual(new CastMemberPresenter(output));
  });

  it('should list cast members', async () => {
    const output: ListCastMembersOutput = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Movie',
          type: CastMemberTypeEnum.actor,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    controller['_listCastMembers'] = mockListUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const presenter = await controller.search(searchParams);
    expect(presenter).toBeInstanceOf(CastMemberCollectionPresenter);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new CastMemberCollectionPresenter(output));
  });
});
