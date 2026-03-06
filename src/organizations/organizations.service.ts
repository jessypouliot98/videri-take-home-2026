import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { OrganizationDto } from './dto/organization.dto.js';
import { prisma } from '../../lib/prisma/index.js';

@Injectable()
export class OrganizationsService {
  async createOrganization(
    dto: CreateOrganizationDto,
  ): Promise<OrganizationDto> {
    return prisma.organization.create({
      data: {
        name: dto.name,
      },
    });
  }
}
