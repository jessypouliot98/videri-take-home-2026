import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthGuard } from '../lib/nest/auth/auth.guard.js';
import { Public } from '../lib/nest/auth/auth.decorator.js';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @Public()
  getHealth(): string {
    return 'Ok';
  }
}
