import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';
import { CreateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/create-cast-member/create-cast-member.use-case';
import { DeleteCastMemberUseCase } from 'src/core/data/use-cases/cast-member/delete-cast-member/delete-cast-member.use-case';
import { GetCastMemberUseCase } from 'src/core/data/use-cases/cast-member/get-cast-member/get-cast-member.use-case';
import { ListCastMembersUseCase } from 'src/core/data/use-cases/cast-member/list-cast-members/list-cast-members';
import { UpdateCastMemberUseCase } from 'src/core/data/use-cases/cast-member/update-cast-member/update-cast-member.use-case';
import { ICreateCastMemberUseCase } from 'src/core/domain/contracts/use-cases/cast-member/create-cast-member';
import { IDeleteCastMemberUseCase } from 'src/core/domain/contracts/use-cases/cast-member/delete-cast-member';
import { IGetCastMemberUseCase } from 'src/core/domain/contracts/use-cases/cast-member/get-cast-member';
import { IListCastMembersUseCase } from 'src/core/domain/contracts/use-cases/cast-member/list-cast-members';
import {
  IUpdateCastMemberInput,
  IUpdateCastMemberUseCase,
} from 'src/core/domain/contracts/use-cases/cast-member/update-cast-member';
import {
  CastMemberCollectionPresenter,
  CastMemberPresenter,
} from './cast-member.presenter';
import { CreateCastMemberInputDto } from './dtos/create-cast-member.dto';
import { SearchCastMembersDto } from './dtos/search-cast-member.dto';

@Controller('cast-members')
export class CastMembersController {
  @Inject(CreateCastMemberUseCase)
  private _createCastMemberUseCase: ICreateCastMemberUseCase;

  @Inject(UpdateCastMemberUseCase)
  private _updateCastMemberUseCase: IUpdateCastMemberUseCase;

  @Inject(DeleteCastMemberUseCase)
  private _deleteCastMemberUseCase: IDeleteCastMemberUseCase;

  @Inject(GetCastMemberUseCase)
  private _getCastMemberUseCase: IGetCastMemberUseCase;

  @Inject(ListCastMembersUseCase)
  private _listCastMembers: IListCastMembersUseCase;

  constructor() {}

  @Post('/')
  async create(@Body() createCastMemberDto: CreateCastMemberInputDto) {
    const output =
      await this._createCastMemberUseCase.execute(createCastMemberDto);
    return CastMembersController.serialize(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this._getCastMemberUseCase.execute({ id });
    return CastMembersController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchCastMembersDto) {
    const output = await this._listCastMembers.execute(searchParamsDto);
    return new CastMemberCollectionPresenter(output);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateCastMemberDto: IUpdateCastMemberInput,
  ) {
    const output = await this._updateCastMemberUseCase.execute({
      ...updateCastMemberDto,
      id,
    });
    return CastMembersController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    await this._deleteCastMemberUseCase.execute({ id });
  }

  static serialize(output: CastMemberOutput) {
    return new CastMemberPresenter(output);
  }
}
