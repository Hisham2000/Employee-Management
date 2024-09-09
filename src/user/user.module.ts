import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { RoleModule } from '../role/role.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Role]), RoleModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
