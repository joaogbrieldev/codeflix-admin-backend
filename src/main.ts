import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { WrapperDataInterceptor } from './nest-modules/interceptors/wrapper-data/wrapper-data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422
    })
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new WrapperDataInterceptor())
  await app.listen(process.env.PORT ?? 3000);
  console.log('app running at port 3000')
}
bootstrap();
