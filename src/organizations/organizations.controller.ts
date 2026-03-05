import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { SchemaCreateOrganization } from './dto/create-organization.dto.js';
import type { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { ValidatedValuePipe } from '../modules/pipes/validated-value.pipe.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';

@Controller('orgs')
@UseGuards(AuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(
    @Body(new ValidatedValuePipe(SchemaCreateOrganization))
    createOrganizationDto: CreateOrganizationDto,
  ) {
    return this.organizationsService.create(createOrganizationDto);
  }
}
