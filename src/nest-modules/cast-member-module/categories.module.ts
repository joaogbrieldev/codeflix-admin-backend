import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CastMemberModel } from 'src/core/infra/db/postgres/cast-member/cast-member.model';
import { CAST_MEMBER_PROVIDERS } from './categories.providers';

@Module({
  imports: [SequelizeModule.forFeature([CastMemberModel])],
  providers: [
    ...Object.values(CAST_MEMBER_PROVIDERS.REPOSITORIES),
    ...Object.values(CAST_MEMBER_PROVIDERS.USE_CASES),
  ],
})
export class CastMembersModule {}
