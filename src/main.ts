import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';
import * as fs from "fs";

const UPLOAD_DIR = join(process.cwd(), 'uploads');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  const config = new DocumentBuilder().setTitle("AEJ").setVersion("1.0").addServer('http://localhost:3000').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }
  app.use('/uploads', express.static(UPLOAD_DIR));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
