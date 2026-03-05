import { Module } from '@nestjs/common';
import { AlertService } from './alert.service.js';
import { AlertController } from './alert.controller.js';

@Module({
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
