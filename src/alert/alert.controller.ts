import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
} from '@nestjs/common';
import { AlertService } from './alert.service.js';
import { SchemaCreateAlert } from './dto/create-alert.dto.js';
import { SchemaUpdateAlert } from './dto/update-alert.dto.js';
import type { CreateAlertDto } from './dto/create-alert.dto.js';
import type { UpdateAlertDto } from './dto/update-alert.dto.js';
import { SchemaValidationPipe } from '../modules/pipes/SchemaValidation.pipe.js';
import { HttpNotFoundException } from '../modules/http/errors/HttpNotFoundException.js';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.alertService.findOne(id);
    if (!result) {
      throw new HttpNotFoundException('Alert not found');
    }
    return result;
  }

  @Patch(':id')
  @UsePipes(new SchemaValidationPipe(SchemaUpdateAlert))
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertService.update(id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertService.remove(id);
  }
}
