import { Controller, Post } from "@nestjs/common";
import { OrganizationService } from "./organization.service.js";

@Controller("orgs")
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  async createOrganization() {
    return Promise.resolve("Organization created");
  }
}
