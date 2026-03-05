import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { SchemaCreateUser } from './dto/create-user.dto.js';
import { ValidatedValuePipe } from '../modules/pipes/validated-value.pipe.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new ValidatedValuePipe(SchemaCreateUser))
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }
}
