import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

export async function createApp() {
  return NestFactory.create(AppModule);
}

function openApiFactory() {
  return new DocumentBuilder()
    .setTitle('Videri Take-Home Assignment')
    .setDescription('Multi-Tenant Alerts & Workflow Service')
    .setVersion('1.0')
    .build();
}

export function createOpenApiDocument(app: INestApplication) {
  return SwaggerModule.createDocument(app, openApiFactory());
}

export function setupOpenApi(app: INestApplication) {
  const openApiDoc = SwaggerModule.createDocument(app, openApiFactory());
  SwaggerModule.setup('api', app, cleanupOpenApiDoc(openApiDoc));
}
