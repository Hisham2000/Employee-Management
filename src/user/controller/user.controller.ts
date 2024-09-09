import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AddNewUserRequest } from '../dto/add-new-user-request';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorator/roles.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('')
  @Roles('HR', 'Admin')
  async addNewUser(@Body() addNewUserDTO: AddNewUserRequest){
    return this.userService.addNewUser(addNewUserDTO);
  }

  @Get('')
  @Roles('HR')
  async getAll(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10
  ){
    return this.userService.getAll(page, limit);
  }

}
