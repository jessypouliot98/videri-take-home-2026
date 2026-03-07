import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserDto } from './dto/user.dto.js';
import { prisma } from '../../lib/prisma/index.js';
import { prismaErrorBoundary } from '../../lib/prisma/utils/prisma-error-boundary.js';
import { UserWithOrganizationsDto } from './dto/user-with-organizations.dto.js';

@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto): Promise<UserDto> {
    return prismaErrorBoundary(() => {
      return prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          organizationId: dto.organizationId,
        },
      });
    });
  }

  // For ease of demo only
  async __UNSAFE__findAllUsers(): Promise<UserWithOrganizationsDto[]> {
    return prisma.user.findMany({
      include: {
        organization: true,
      },
    });
  }
}
