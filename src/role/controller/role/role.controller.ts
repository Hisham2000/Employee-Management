import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../../entities/role.entity';

@Controller('role')
export class RoleController {

  constructor(private readonly roleService: RoleService) {
  }

  @Roles('HR')
  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}
