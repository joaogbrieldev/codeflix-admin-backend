// import { instanceToPlain } from 'class-transformer';
// import { CategoryOutputMapper } from 'src/core/data/use-cases/category/common/category-output';
// import { ICategoryRepository } from 'src/core/domain/contracts/repositories/category.repository';
// import { ListCategoriesFixture } from 'src/nest-modules/categories-module/__tests__/category.fixture';
// import { CategoriesController } from 'src/nest-modules/categories-module/categories.controller';
// import { CATEGORY_PROVIDERS } from 'src/nest-modules/categories-module/categories.providers';
// import { startApp } from 'src/nest-modules/shared-module/testing/helpers';
// import { CategoryFakeBuilder } from 'src/test/fake-builders/category.fake-builder';
// import request from 'supertest';

// describe('CategoriesController (e2e)', () => {
//   describe('/categories (GET)', () => {
//     describe('should return categories sorted by created_at when request query is empty', () => {
//       let categoryRepo: ICategoryRepository;
//       const nestApp = startApp();
//       const category1 = CategoryFakeBuilder.aCategory().build();
//       const category2 = CategoryFakeBuilder.aCategory().build();
//       const { arrange } =
//         ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

//       beforeEach(async () => {
//         categoryRepo = nestApp.app.get<ICategoryRepository>(
//           CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
//         );
//         await categoryRepo.create(category1);
//         await categoryRepo.create(category2);
//       });

//       test.each(arrange)(
//         'when query params is $send_data',
//         async ({ send_data, expected }) => {
//           const queryParams = new URLSearchParams(send_data as any).toString();
//           return request(nestApp.app.getHttpServer())
//             .get(`/categories/?${queryParams}`)
//             .expect(200)
//             .expect({
//               data: expected.entities.map((e) =>
//                 instanceToPlain(
//                   CategoriesController.serialize(
//                     CategoryOutputMapper.toOutput(e),
//                   ),
//                 ),
//               ),
//               meta: expected.meta,
//             });
//         },
//       );
//     });

//     describe('should return categories using paginate, filter and sort', () => {
//       let categoryRepo: ICategoryRepository;
//       const nestApp = startApp();
//       const { arrange } = ListCategoriesFixture.arrangeUnsorted();
//       const category1 = CategoryFakeBuilder.aCategory().build();
//       const category2 = CategoryFakeBuilder.aCategory().build();
//       beforeEach(async () => {
//         categoryRepo = nestApp.app.get<ICategoryRepository>(
//           CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
//         );
//         await categoryRepo.create(category1);
//         await categoryRepo.create(category2);
//       });

//       test.each([arrange])(
//         'when query params is $send_data',
//         async ({ send_data, expected }) => {
//           const queryParams = new URLSearchParams(send_data as any).toString();
//           return request(nestApp.app.getHttpServer())
//             .get(`/categories/?${queryParams}`)
//             .expect(200)
//             .expect({
//               data: expected.entities.map((e) =>
//                 instanceToPlain(
//                   CategoriesController.serialize(
//                     CategoryOutputMapper.toOutput(e),
//                   ),
//                 ),
//               ),
//               meta: expected.meta,
//             });
//         },
//       );
//     });
//   });
// });
