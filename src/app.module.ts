import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AlertModule } from './alert/alert.module.js';

@Module({
  imports: [AlertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
