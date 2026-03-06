import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../lib/nest/auth/auth.guard.js';
import { Public } from '../lib/nest/auth/auth.decorator.js';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  @Get('health')
  @Public()
  getHealth(): string {
    return 'Ok';
  }
}
