import { Module } from '@nestjs/common';

import { CastMembersModule } from './nest-modules/cast-members-module/cast-members.module';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';

@Module({
  imports: [
    DatabaseModule,
    CategoriesModule,
    CastMembersModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
