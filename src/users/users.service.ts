import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserDto } from './dto/user.dto.js';
import { prisma } from '../modules/prisma/index.js';

@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto): Promise<UserDto> {
    return prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        organizationId: dto.organizationId,
      },
    });
  }
}
