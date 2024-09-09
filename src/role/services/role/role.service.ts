import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role)
              private roleRepository: Repository<Role>) {
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepository.findOneBy( { id });
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
