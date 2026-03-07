import { createZodDto } from 'nestjs-zod';
import { UserDto } from './user.dto.js';
import { OrganizationDto } from '../../organizations/dto/organization.dto.js';



export class UserWithOrganizationsDto extends createZodDto(
  UserDto.schema.extend({
    organization: OrganizationDto.schema,
  }),
  { codec: true },
) {}
