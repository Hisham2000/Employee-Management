import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength, Validate } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class AddNewUserRequest{

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(9)
  password: string;

  @ApiProperty()
  @MaxLength(5)
  @IsNotEmpty()
  salary: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose({ name: 'role_id' })
  @Transform(({ value }) => Number(value))
  roleId: number;

  @ApiProperty()
  @Expose({ name: 'manager_id' })
  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  managerId: number;
}