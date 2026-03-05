import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AlertsService } from './alerts.service.js';
import { SchemaCreateAlert } from './dto/create-alert.dto.js';
import type { CreateAlertDto } from './dto/create-alert.dto.js';
import { ValidatedValuePipe } from '../modules/pipes/validated-value.pipe.js';
import { SchemaFindPageQuery } from './dto/find-page-query.dto.js';
import type { FindPageQueryDto } from './dto/find-page-query.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';

@Controller('alerts')
@UseGuards(AuthGuard)
export class AlertsController {
  constructor(private readonly alertService: AlertsService) {}

  @Post()
  create(
    @Body(new ValidatedValuePipe(SchemaCreateAlert))
    createAlertDto: CreateAlertDto,
  ) {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  findPage(
    @Query(new ValidatedValuePipe(SchemaFindPageQuery)) query: FindPageQueryDto,
  ) {
    return this.alertService.findPage({
      page: query.page,
      size: query.size,
      status: query.status,
    });
  }
}
