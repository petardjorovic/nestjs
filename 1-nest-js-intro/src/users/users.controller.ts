import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUsers() {
    const usersService = new UsersService();
    return usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const usersService = new UsersService();
    return usersService.getUserById(Number(id));
  }

  @Post()
  createUser() {
    const usersService = new UsersService();
    const user = { id: 1, name: 'Petar', age: 36, isMarried: false };
    usersService.createUser(user);
    return 'You have successfully created new user.';
  }
}
