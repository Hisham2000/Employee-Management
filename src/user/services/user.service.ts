import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { AddNewUserRequest } from '../dto/add-new-user-request';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../../role/services/role/role.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } }) || null;
  }


  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository
      .findOneOrFail({
        where: { email },
        relations: ['role'],
      })
      .catch(() => {
        this.logger.error('Invalid username or password');
        throw new NotFoundException('Invalid username or password');
      });
  }

  async addNewUser(addNewUserDTO: AddNewUserRequest) {
    const user = await this.findByEmail(addNewUserDTO.email);
    const role = await this.roleService.findOne(addNewUserDTO.roleId);
    if (user) {
      throw new NotFoundException('User already exists');
    }else if(role == null){
      throw new NotFoundException('The Role Id Is Invalid');
    }
    let manager = null;
    addNewUserDTO.password = await bcrypt.hash(addNewUserDTO.password, 10);
    let newUser: User = plainToInstance(User, addNewUserDTO);
    newUser = this.usersRepository.create(addNewUserDTO);

    if(addNewUserDTO.managerId){
      manager = await this.usersRepository.findOneBy(
        { id: addNewUserDTO.managerId, role: {name: 'Manager'} }) || null;
      if (manager == null) throw new NotFoundException('The Manger Id Is Not A Manager');
      newUser.manager = manager;
    }
    newUser.role = role;
    return this.usersRepository.save(newUser);
  }

  async getAll(page: number, limit: number) {
    const [users, totalCount] = await this.usersRepository.findAndCount({
      take: limit,
      skip: page * limit
    });
    return {
      data: users,
      total: totalCount,
      currentPage: page,
      totalPage: Math.ceil(totalCount / limit)
    };
  }
}
