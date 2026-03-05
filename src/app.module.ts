import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AlertModule } from './alert/alert.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AlertModule, OrganizationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
