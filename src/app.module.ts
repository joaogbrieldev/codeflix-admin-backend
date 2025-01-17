import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoryModel } from './core/infra/db/postgres/category/category.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite' as any,
      host: ':memory',
      logging: false,
      models: [CategoryModel],
    }),
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
