import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { HttpExceptionFilter } from '../lib/nest/filters/http-exception.filter.js';
import { UsersModule } from './users/users.module.js';
import { AlertsModule } from './alerts/alerts.module.js';

@Module({
  imports: [OrganizationsModule, UsersModule, AlertsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
