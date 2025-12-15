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
    const user = this.usersService
      .getAllUsers()
      .find((u) => u.email === email && u.password === pasw);
    if (user) {
      this.isAuthenticated = true;
      return `${user.name} are logged in!`;
    }
    return 'Wrong email or password!';
  }
}
