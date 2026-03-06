import { Injectable } from '@nestjs/common';
import { prisma } from '../modules/prisma/index.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';
import { AlertDto } from './dto/alert.dto.js';
import { GetAlertsDto } from './dto/get-alerts.dto.js';

@Injectable()
export class AlertsService {
  async createAlert(dto: CreateAlertDto): Promise<AlertDto> {
    return prisma.alert.create({
      data: {
        title: dto.title,
        status: dto.status,
        organizationId: dto.organizationId,
        createdById: dto.createdById,
      },
    });
  }

  async getAlerts(dto: GetAlertsDto): Promise<AlertDto[]> {
    return prisma.alert.findMany({
      where: {
        status: dto.status,
      },
    });
  }
}
