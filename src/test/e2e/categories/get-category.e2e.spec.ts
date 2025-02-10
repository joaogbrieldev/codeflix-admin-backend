import { instanceToPlain } from 'class-transformer';
import { Uuid } from 'src/@shared/src/domain/value-objects/uuid.vo';
import { CategoryOutputMapper } from 'src/core/data/use-cases/category/common/category-output';
import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category/category.repository';
import { CreateCategoryFixture } from 'src/nest-modules/categories-module/__tests__/category.fixture';
import { CategoriesController } from 'src/nest-modules/categories-module/categories.controller';
import { CATEGORY_PROVIDERS } from 'src/nest-modules/categories-module/categories.providers';
import { startApp } from 'src/nest-modules/shared-module/testing/helpers';
import { CategoryFakeBuilder } from 'src/test/fake-builders/category.fake-builder';
import request from 'supertest';

describe('CategoriesController (e2e)', () => {
  describe('/get/:id (GET)', () => {
    const appHelper = startApp();
    describe('should a response error when id is invalid or not found', () => {
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          expected: {
            message:
              'Category Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)('when id is $id', async ({ id, expected }) => {
        return request(appHelper.app.getHttpServer())
          .get(`/categories/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should get a category response with status 200', async () => {
      const categoryRepo = appHelper.app.get<ICategoryRepository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const category = CategoryFakeBuilder.aCategory().build();
      await categoryRepo.create(category);

      const res = await request(appHelper.app.getHttpServer())
        .get(`/categories/${category.category_id.id}`)
        .expect(200);

      const keysInResponse = CreateCategoryFixture.keysInResponse;
      expect(Object.keys(res.body)).toStrictEqual(['data']);
      expect(Object.keys(res.body.data)).toStrictEqual(keysInResponse);
      const id = res.body.data.id;
      const categoryCreated = await categoryRepo.findById(new Uuid(id));

      const presenter = CategoriesController.serialize(
        CategoryOutputMapper.toOutput(categoryCreated!),
      );
      const serialized = instanceToPlain(presenter);

      expect(res.body.data).toStrictEqual(serialized);
    });
  });
});
