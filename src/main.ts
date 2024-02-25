import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // create a new nestJS application -> appModule is the root file!
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  ); // execute validation decorators
  await app.listen(3000, '0.0.0.0');
  console.log(`Nest Application is running on: ${await app.getUrl()}`);
}
bootstrap();
