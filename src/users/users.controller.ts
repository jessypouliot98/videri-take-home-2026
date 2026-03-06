import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ZodResponse } from 'nestjs-zod';
import { UserDto } from './dto/user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Public } from '../../lib/nest/auth/auth.decorator.js';
import { DatabaseHttpError } from '../../lib/prisma/error/database-http-error.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public() // This endpoint is public for testing purposes, but in a real application you would likely want to protect it
  @Post()
  @ZodResponse({ type: UserDto })
  async createUser(@Body() body: CreateUserDto) {
    try {
      return await this.usersService.createUser(body);
    } catch (error) {
      if (error instanceof DatabaseHttpError) {
        throw error.toNestHttpException();
      }
      throw error;
    }
  }
}
