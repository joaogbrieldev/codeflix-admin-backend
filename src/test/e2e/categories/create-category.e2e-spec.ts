import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { ICategoryRepository } from "src/core/domain/contracts/repositories/category.repository";
import { CreateCategoryFixture } from "src/nest-modules/categories-module/__tests__/category.fixture";
import { CATEGORY_PROVIDERS } from "src/nest-modules/categories-module/categories.providers";
import { applyGlobalConfig } from "src/nest-modules/global.config";
import request from 'supertest';

describe('CategoriesController e2e', () => {
  let app: INestApplication;
  let categoryRepo: ICategoryRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    applyGlobalConfig(app);
    await app.init()
    categoryRepo = app.get<ICategoryRepository>(CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide)
  })

  describe('/categories (POST)', () => {
    const arrange = CreateCategoryFixture.arrangeForCreate();

    test.each(arrange)('when body in $send_data', async ({send_data, expected}) => {
      const res = await request(app.getHttpServer()).post('/categories').send(send_data).expect(201)
      console.log(res)
      
    })
  })

})