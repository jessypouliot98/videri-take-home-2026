import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/createOrganization.dto.js';
import { prisma } from '../modules/prisma/index.js';

@Injectable()
export class OrganizationService {
  async createOrganization(dto: CreateOrganizationDto) {
    return prisma.organization.create({
      data: {
        name: dto.name,
      },
    });
  }
}
