import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'XUjZK@example.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  @Length(9)
  password: string;
}
