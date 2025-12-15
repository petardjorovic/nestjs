import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: {
    id: number;
    name: string;
    email: string;
    age: number;
    isMarried: boolean;
    gender: string;
    password: string;
  }[] = [
    {
      id: 1,
      name: 'Petar',
      age: 36,
      isMarried: false,
      gender: 'male',
      email: 'petar@gmail.com',
      password: 'test1234',
    },
    {
      id: 2,
      name: 'Nenad',
      age: 31,
      isMarried: false,
      gender: 'male',
      email: 'nenad@gmail.com',
      password: 'test1234',
    },
    {
      id: 3,
      name: 'Milica',
      age: 26,
      isMarried: true,
      gender: 'female',
      email: 'milica@gmail.com',
      password: 'test1234',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    // if (this.authService.isAuthenticated) {
    return this.users.find((user) => user.id === id);
    // }
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    isMarried: boolean;
    gender: string;
    email: string;
    password: string;
  }) {
    this.users.push(user);
  }
}
