import { Injectable } from '@nestjs/common';
import type { CreateAlertDto } from './dto/create-alert.dto.js';
import type { UpdateAlertDto } from './dto/update-alert.dto.js';
import { prisma } from '../modules/prisma/index.js';

@Injectable()
export class AlertService {
  create(dto: CreateAlertDto) {
    return prisma.alert.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        createdById: dto.createdById,
        organizationId: dto.organizationId,
      },
    });
  }

  findOne(id: string) {
    return prisma.alert.findUnique({
      where: {
        id,
      },
    });
  }

  findPage() {
    return {
      items: [],
    };
  }

  update(id: string, dto: UpdateAlertDto) {
    return prisma.alert.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        createdById: dto.createdById,
        organizationId: dto.organizationId,
      },
    });
  }

  remove(id: string) {
    return prisma.alert.delete({
      where: {
        id,
      },
    });
  }
}
