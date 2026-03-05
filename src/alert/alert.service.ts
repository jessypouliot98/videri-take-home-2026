import { Injectable } from '@nestjs/common';
import type { CreateAlertDto } from './dto/create-alert.dto.js';
import { prisma } from '../modules/prisma/index.js';
import { AlertStatus } from '../../generated/prisma/enums.js';

@Injectable()
export class AlertService {
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
}
