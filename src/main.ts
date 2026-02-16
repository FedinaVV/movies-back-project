import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {json, urlencoded} from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
