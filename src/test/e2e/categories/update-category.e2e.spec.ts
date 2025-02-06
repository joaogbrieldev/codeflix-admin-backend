import { instanceToPlain } from 'class-transformer';
import { Uuid } from 'src/@shared/src/domain/value-objects/uuid.vo';
import { CategoryOutputMapper } from 'src/core/data/use-cases/category/common/category-output';
import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
import { UpdateCategoryFixture } from 'src/nest-modules/categories-module/__tests__/category.fixture';
import { CategoriesController } from 'src/nest-modules/categories-module/categories.controller';
import { CATEGORY_PROVIDERS } from 'src/nest-modules/categories-module/categories.providers';
import { startApp } from 'src/nest-modules/shared-module/testing/helpers';
import { CategoryFakeBuilder } from 'src/test/fake-builders/category.fake-builder';
import request from 'supertest';

describe('CategoriesController (e2e)', () => {
  describe('/categories/:id (PATCH)', () => {
    describe('should a response error when id is invalid or not found', () => {
      const nestApp = startApp();
      const faker = CategoryFakeBuilder.aCategory().build();
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          send_data: { name: faker.name },
          expected: {
            message:
              'Category Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          send_data: { name: faker.name },
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)(
        'when id is $id',
        async ({ id, send_data, expected }) => {
          return request(nestApp.app.getHttpServer())
            .patch(`/categories/${id}`)
            .send(send_data)
            .expect(expected.statusCode)
            .expect(expected);
        },
      );
    });

    describe('should update a category', () => {
      const appHelper = startApp();
      const arrange = UpdateCategoryFixture.arrangeForUpdate();
      let categoryRepo: ICategoryRepository;

      beforeEach(async () => {
        categoryRepo = appHelper.app.get<ICategoryRepository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
      });
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const categoryCreated = CategoryFakeBuilder.aCategory().build();
          await categoryRepo.create(categoryCreated);

          const res = await request(appHelper.app.getHttpServer())
            .patch(`/categories/${categoryCreated.category_id.id}`)
            .send(send_data)
            .expect(200);
          const keyInResponse = UpdateCategoryFixture.keysInResponse;
          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);
          const id = res.body.data.id;
          const categoryUpdated = await categoryRepo.findById(new Uuid(id));
          const presenter = CategoriesController.serialize(
            CategoryOutputMapper.toOutput(categoryUpdated!),
          );
          const serialized = instanceToPlain(presenter);
          expect(res.body.data).toStrictEqual(serialized);
          expect(res.body.data).toStrictEqual({
            id: serialized.id,
            created_at: serialized.created_at,
            name: expected.name ?? categoryUpdated!.name,
            description:
              'description' in expected
                ? expected.description
                : categoryUpdated!.description,
            is_active: expected.is_active ?? categoryUpdated!.is_active,
          });
        },
      );
    });
  });
});
