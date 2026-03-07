import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { ZodResponse } from 'nestjs-zod';
import { OrganizationDto } from './dto/organization.dto.js';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';

@Controller('orgs')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ZodResponse({ status: 200, type: OrganizationDto })
  async createOrganization(@Body() body: CreateOrganizationDto) {
    return this.organizationsService.createOrganization(body);
  }
}
