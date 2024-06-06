import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstLichChieu() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT_SERVER;

  app.enableCors();
  app.use(express.static('.'));

  const config = new DocumentBuilder().setTitle('Swagger Movies').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  // Áp dụng transform validate toàn cuc
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT, () => {
    console.log(`Connecting server with PORT :  ${PORT}`);
  });
}
bootstLichChieu();
