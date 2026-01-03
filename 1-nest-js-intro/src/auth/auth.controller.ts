import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // http://localhost:3000/auth/signup
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  // http://localhost:3000/auth/login
  @Post('login')
  login(@Body() user: { email: string; password: string }) {
    return this.authService.login(user.email, user.password);
  }
}
