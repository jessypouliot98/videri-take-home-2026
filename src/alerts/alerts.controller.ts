import { Body, Controller, Post } from '@nestjs/common';
import { AlertsService } from './alerts.service.js';
import { ZodResponse } from 'nestjs-zod';
import { AlertDto } from './dto/alert.dto.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ZodResponse({ type: AlertDto })
  async createAlert(@Body() body: CreateAlertDto) {
    return this.alertsService.createAlert(body);
  }
}
