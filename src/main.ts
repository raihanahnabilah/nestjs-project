import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './tasks/transform.interceptor';

// Basically to access environment variables, you should give process.env
// And technically you can give the names of the variables "MY_VARIABLE", "SOMETHING" by passing it on the terminal cli

console.log(process.env.NODE); // This is how to access environment variables
console.log(process.env.MY_VARIABLE); // This is how to access environment variables
console.log(process.env.SOMETHING); // This is how to access environment variables

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule); // create a new nestJS application -> appModule is the root file!
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  ); // execute validation decorators
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT;
  await app.listen(port, '0.0.0.0');
  logger.log(`Nest Application is running on: ${await app.getUrl()}`); // oh instead of using console.log, you should use logger.log isntead
}
bootstrap();
