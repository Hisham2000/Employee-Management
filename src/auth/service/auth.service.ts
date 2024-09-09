import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable()
export class AuthService {
  logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    this.logger.error(
      'Invalid username or password',
    );
    throw new NotFoundException('Invalid username or password');
  }

  async login(loginDto: LoginDto) {
    const user: User = await this.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name,
      salary: user.salary,
    };

    const response: LoginResponseDto = {
      token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '1y' })
    }
    return response;
  }

  refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'secret',
      });
      const newAccessToken = this.jwtService.sign(
        {
          name: payload.name,
          email: payload.email,
          role: payload.role,
          salary: payload.salary,
        },
        { expiresIn: '1m' },
      );
      return {
        access_token: newAccessToken,
      };
    } catch (e) {
      this.logger.error('Invalid refresh token', AuthService.name, 'refreshToken', 35);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
