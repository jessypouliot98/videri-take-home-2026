import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { prisma } from '../modules/prisma/index.js';

@Injectable()
export class OrganizationsService {
  async create(dto: CreateOrganizationDto) {
    const result = await prisma.organization.create({
      data: {
        name: dto.name,
      },
    });
    return result;
  }

  findAll() {
    return `This action returns all organizations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
