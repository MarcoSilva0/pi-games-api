import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost',
    credentials: true
  });
  await app.listen(process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000);
}
bootstrap();
