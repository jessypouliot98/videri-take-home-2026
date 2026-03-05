import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AlertsModule } from './alerts/alerts.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [AlertsModule, OrganizationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
