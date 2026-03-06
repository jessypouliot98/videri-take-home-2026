import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma/index.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';
import { AlertDto } from './dto/alert.dto.js';
import { GetAlertsDto } from './dto/get-alerts.dto.js';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto.js';
import { AlertEventDto } from './dto/alert-event.dto.js';

@Injectable()
export class AlertsService {
  async createAlert(
    createdById: string,
    organizationId: string,
    dto: CreateAlertDto,
  ): Promise<AlertDto> {
    return prisma.alert.create({
      data: {
        title: dto.title,
        status: dto.status,
        organizationId: organizationId,
        createdById: createdById,
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

  async updateAlertStatus(
    alertId: string,
    createdById: string,
    organizationId: string,
    dto: UpdateAlertStatusDto,
  ): Promise<AlertDto> {
    return prisma.$transaction(async (tx) => {
      const prevAlert = await tx.alert.findFirstOrThrow({
        where: {
          id: alertId,
          organizationId,
        },
        select: {
          status: true,
        },
      });
      if (!canUpdateAlertStatus(prevAlert.status, dto.status)) {
        throw new UpdateAlertStatusError();
      }
      const alert = await tx.alert.update({
        where: { id: alertId },
        data: { status: dto.status },
      });
      await tx.alertEvent.create({
        data: {
          alertId,
          createdById,
          fromStatus: prevAlert.status,
          toStatus: alert.status,
        },
      });
      return alert;
    });
  }

  async getAlertEvents(
    alertId: string,
    organizationId: string,
  ): Promise<AlertEventDto[]> {
    return prisma.alertEvent.findMany({
      where: {
        alert: {
          id: alertId,
          organizationId: organizationId,
        },
      },
    });
  }
}

function canUpdateAlertStatus(..._params: unknown[]): boolean {
  return true;
}

class UpdateAlertStatusError extends Error {}
