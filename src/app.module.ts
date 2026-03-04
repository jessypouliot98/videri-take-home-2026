import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OrganizationModule } from './organization/organization.module.js';

@Module({
  imports: [OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
