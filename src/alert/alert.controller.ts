import { Controller, Get, Post, Body, UsePipes, Query } from '@nestjs/common';
import { AlertService } from './alert.service.js';
import { SchemaCreateAlert } from './dto/create-alert.dto.js';
import type { CreateAlertDto } from './dto/create-alert.dto.js';
import { SchemaValidationPipe } from '../modules/pipes/SchemaValidation.pipe.js';
import { ValidatedValuePipe } from '../modules/pipes/validated-value.pipe.js';
import { SchemaFindPageQuery } from './dto/find-page-query.dto.js';
import type { FindPageQueryDto } from './dto/find-page-query.dto.js';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  @UsePipes(new SchemaValidationPipe(SchemaCreateAlert))
  create(@Body() createAlertDto: CreateAlertDto) {
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
