import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AlertsService } from './alerts.service.js';
import { SchemaCreateAlert } from './dto/create-alert.dto.js';
import type { CreateAlertDto } from './dto/create-alert.dto.js';
import { ValidatedValuePipe } from '../modules/pipes/validated-value.pipe.js';
import { SchemaFindPageQuery } from './dto/find-page-query.dto.js';
import type { FindPageQueryDto } from './dto/find-page-query.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { SchemaUpdateAlertStatus } from './dto/update-alert-status.dto.js';
import type { UpdateAlertStatusDto } from './dto/update-alert-status.dto.js';
import { UserId } from '../modules/auth/auth.decorator.js';
import { UpdateAlertStatusValidatorError } from './utils/update-alert-status-validator.js';

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

  @Patch(':alertId/status')
  async updateStatus(
    @Param('alertId') alertId: string,
    @UserId() userId: string,
    @Body(new ValidatedValuePipe(SchemaUpdateAlertStatus))
    updateAlertStatusDto: UpdateAlertStatusDto,
  ) {
    try {
      return await this.alertService.updateStatus(
        { alertId, userId },
        updateAlertStatusDto,
      );
    } catch (error) {
      if (error instanceof UpdateAlertStatusValidatorError) {
        throw new BadRequestException(error.message, {
          cause: error,
        });
      }
      throw new BadRequestException('Failed to update alert status', {
        cause: error,
      });
    }
  }
}
