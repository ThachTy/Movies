import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstLichChieu() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(express.static('.'));

  const config = new DocumentBuilder().setTitle('Swagger Movies').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  // Áp dụng transform validate toàn cuc
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(5000);
}
bootstLichChieu();
