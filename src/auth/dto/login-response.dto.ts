import { Expose } from 'class-transformer';

export class LoginResponseDto{

  token: string;

  @Expose({name: 'refresh_token'})
  refreshToken: string
}