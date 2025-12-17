import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public isAuthenticated: boolean = false;

  login(email: string, pasw: string) {
    console.log(email, pasw);
    return 'Wrong email or password!';
  }
}
