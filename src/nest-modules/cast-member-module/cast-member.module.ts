import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CastMemberModel } from 'src/core/infra/repository/cast-member/cast-member.repository';
import { CastMembersController } from './cast-member.controller';
import { CAST_MEMBERS_PROVIDERS } from './cast-member.providers';

@Module({
  controllers: [CastMembersController],
  imports: [SequelizeModule.forFeature([CastMemberModel])],
  providers: [
    ...Object.values(CAST_MEMBERS_PROVIDERS.REPOSITORIES),
    ...Object.values(CAST_MEMBERS_PROVIDERS.USE_CASES),
  ],
})
export class CastMembersModule {}
