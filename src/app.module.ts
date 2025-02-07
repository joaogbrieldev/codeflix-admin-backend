import { Module } from '@nestjs/common';

import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { SharedModuleModule } from './nest-modules/shared-module/shared-module.module';

@Module({
  imports: [
    DatabaseModule,
    CategoriesModule,
    ConfigModule.forRoot(),
    SharedModuleModule,
  ],
})
export class AppModule {}
