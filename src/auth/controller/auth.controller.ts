/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from '../decorator/public.decorator';
import { Roles } from '../decorator/roles.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from '../dto/login-response.dto';

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Authentication')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOkResponse({
    description: 'Successful login',
    type: LoginResponseDto,
    example: {
      'token': 'mockedToken',
      'refresh-token': 'mockedRefreshToken'
    }
  })
  async login(@Body() loginDTO: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDTO);
  }

  @Get('protected')
  @Roles('User', 'Admin')
  @ApiBearerAuth()
  getHello(): string {
    return 'Hello World!';
  }

  @ApiOkResponse({
    description: 'refresh_token',
    example: {
      'refresh-token': 'mockedRefreshToken'
    }
  })
  @Post('refresh-token')
  @Public()
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
