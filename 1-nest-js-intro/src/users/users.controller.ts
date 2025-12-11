import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(limit, page);
    const usersService = new UsersService();
    return usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const usersService = new UsersService();
    return usersService.getUserById(id);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) user: CreateUserDto) {
    console.log(user);

    // const usersService = new UsersService();
    // const user = {
    //   id: 1,
    //   name: 'Petar',
    //   age: 36,
    //   isMarried: false,
    //   gender: 'male',
    //   email: 'petar@gmail.com',
    // };
    // usersService.createUser(user);
    return 'You have successfully created new user.';
  }
}
