import { HashingProvider } from 'src/auth/provider/hashing-provider';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public isAuthenticated: boolean = false;

  public async signup(createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  public async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getUserByUsername(
      loginUserDto.username,
    );

    const isPasswordValid = await this.hashingProvider.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong username or password!');
    }

    return {
      data: user,
      success: true,
      message: 'User logged in successfully',
    };
  }
}
