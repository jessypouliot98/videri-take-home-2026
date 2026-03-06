import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ZodResponse } from 'nestjs-zod';
import { UserDto } from './dto/user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ZodResponse({ type: UserDto })
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
