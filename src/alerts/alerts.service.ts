import { Injectable } from '@nestjs/common';
import type { CreateAlertDto } from './dto/create-alert.dto.js';
import { prisma } from '../modules/prisma/index.js';
import { AlertStatus } from '../../generated/prisma/enums.js';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto.js';
import { updateAlertStatusValidator, UpdateAlertStatusValidatorError } from './utils/update-alert-status-validator.js';

@Injectable()
export class AlertsService {
  async create(dto: CreateAlertDto) {
    const result = await prisma.alert.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        createdById: dto.createdById,
        organizationId: dto.organizationId,
      },
    });
    return result;
  }

  async findPage(params: { size: number; page: number; status?: AlertStatus }) {
    const where = {
      status: params.status,
    };
    const skip = (params.page - 1) * params.size;
    const take = params.size;
    const [items, count] = await Promise.all([
      prisma.alert.findMany({
        where,
        take,
        skip,
      }),
      prisma.alert.count({
        where,
      }),
    ]);
    return {
      items,
      prevPage: params.page > 1 ? params.page - 1 : null,
      nextPage: count > skip + take ? params.page + 1 : null,
    };
  }

  async updateStatus(
    params: { userId: string; alertId: string },
    dto: UpdateAlertStatusDto,
  ) {
    await prisma.$transaction(async (tx) => {
      const alert = await tx.alert.findUnique({
        where: { id: params.alertId },
        select: { status: true },
      });
      if (!alert) {
        throw new Error('Alert not found');
      }
      console.log(alert.status, dto.status);
      if (!updateAlertStatusValidator(alert.status, dto.status)) {
        throw new UpdateAlertStatusValidatorError(alert.status, dto.status);
      }
      await tx.alert.update({
        where: { id: params.alertId },
        data: { status: dto.status },
      });
      await tx.alertEvent.create({
        data: {
          userId: params.userId,
          alertId: params.alertId,
          fromStatus: alert.status,
          toStatus: dto.status,
        },
      });
    });
  }
}
