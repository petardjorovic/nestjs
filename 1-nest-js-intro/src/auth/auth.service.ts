import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  public isAuthenticated: boolean = false;

  login(email: string, pasw: string) {
    console.log(email, pasw);
    console.log(this.authConfiguration);
    return 'Wrong email or password!';
  }
}
