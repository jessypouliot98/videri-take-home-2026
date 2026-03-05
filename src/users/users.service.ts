import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto.ts';
import { prisma } from '../modules/prisma/index.js';

@Injectable()
export class UsersService {
  async create(dto: CreateUserDto) {
    const result = await prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        organizationId: dto.organizationId,
      },
    });
    return result;
  }
}
