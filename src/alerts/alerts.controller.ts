import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AlertsService } from './alerts.service.js';
import { ZodResponse } from 'nestjs-zod';
import { AlertDto } from './dto/alert.dto.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';
import { GetAlertsDto } from './dto/get-alerts.dto.js';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto.js';
import { OrgId, UserId } from '../modules/auth/auth.decorator.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { AlertEventDto } from './dto/alert-event.dto.js';

@Controller('alerts')
@UseGuards(AuthGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ZodResponse({ type: AlertDto })
  async createAlert(
    @Body() body: CreateAlertDto,
    @UserId() userId: string,
    @OrgId() organizationId: string,
  ) {
    return this.alertsService.createAlert(userId, organizationId, body);
  }

  @Get()
  @ZodResponse({ type: [AlertDto] })
  async getAlerts(@Query() query: GetAlertsDto) {
    return this.alertsService.getAlerts(query);
  }

  @Patch(':alertId/status')
  @ZodResponse({ type: AlertDto })
  async updateAlertStatus(
    @Param('alertId') alertId: string,
    @UserId() userId: string,
    @OrgId() organizationId: string,
    @Body() body: UpdateAlertStatusDto,
  ) {
    return this.alertsService.updateAlertStatus(
      alertId,
      userId,
      organizationId,
      body,
    );
  }

  @Get(':alertId/events')
  @ZodResponse({ type: [AlertEventDto] })
  async getAlertEvents(
    @Param('alertId') alertId: string,
    @OrgId() organizationId: string,
  ) {
    return this.alertsService.getAlertEvents(alertId, organizationId);
  }
}
