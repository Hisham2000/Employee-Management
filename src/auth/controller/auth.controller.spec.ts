import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue('mockedToken'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call AuthService.login with the correct DTO', async () => {
    const loginDTO: LoginDto = { email: 'test@gmail.com', password: 'testPassword' };

    const result = await controller.login(loginDTO);

    expect(authService.login).toHaveBeenCalledWith(loginDTO);
    expect(result).toBe('mockedToken');
  });


});
