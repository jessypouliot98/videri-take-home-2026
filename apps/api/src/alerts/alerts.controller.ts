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
import { GetAlertsQueryDto } from './dto/get-alerts-query.dto.js';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto.js';
import { OrgId, UserId } from '../../lib/nest/auth/auth.decorator.js';
import { AuthGuard } from '../../lib/nest/auth/auth.guard.js';
import { AlertEventDto } from './dto/alert-event.dto.js';
import { GetAlertsPageDto } from './dto/get-alerts-page.dto.js';

@Controller('alerts')
@UseGuards(AuthGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ZodResponse({ status: 200, type: AlertDto })
  async createAlert(
    @Body() body: CreateAlertDto,
    @UserId() userId: string,
    @OrgId() organizationId: string,
  ) {
    return this.alertsService.createAlert(userId, organizationId, body);
  }

  @Get()
  @ZodResponse({ status: 200, type: GetAlertsPageDto })
  async getAlertsPage(
    @Query() query: GetAlertsQueryDto,
    @OrgId() organizationId: string,
  ) {
    return this.alertsService.getAlertsPage(organizationId, query);
  }

  @Patch(':alertId/status')
  @ZodResponse({ status: 200, type: AlertDto })
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
  @ZodResponse({ status: 200, type: [AlertEventDto] })
  async getAlertEvents(
    @Param('alertId') alertId: string,
    @OrgId() organizationId: string,
  ) {
    return this.alertsService.getAlertEvents(alertId, organizationId);
  }
}
