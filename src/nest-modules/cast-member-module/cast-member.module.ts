import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';
import { CastMembersController } from './cast-member.controller';
import { CAST_MEMBER_PROVIDERS } from './cast-member.providers';

@Module({
  controllers: [CastMembersController],
  imports: [SequelizeModule.forFeature([CastMemberModel])],
  providers: [
    ...Object.values(CAST_MEMBER_PROVIDERS.REPOSITORIES),
    ...Object.values(CAST_MEMBER_PROVIDERS.USE_CASES),
  ],
})
export class CastMembersModule {}
