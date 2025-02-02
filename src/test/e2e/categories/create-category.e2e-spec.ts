import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
import { CreateCategoryFixture } from 'src/nest-modules/categories-module/__tests__/category.fixture';
import { CATEGORY_PROVIDERS } from 'src/nest-modules/categories-module/categories.providers';
import { startApp } from 'src/nest-modules/shared-module/testing/helpers';
import request from 'supertest';

describe('CategoriesController e2e', () => {
  const appHelper = startApp();
  let categoryRepo: ICategoryRepository;

  beforeEach(async () => {
    categoryRepo = appHelper.app.get<ICategoryRepository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  describe('/categories (POST)', () => {
    const arrange = CreateCategoryFixture.arrangeForCreate();

    test.each(arrange)(
      'when body in $send_data',
      async ({ send_data, expected }) => {
        const res = await request(app.getHttpServer())
          .post('/categories')
          .send(send_data)
          .expect(201);
      },
    );
  });
});
