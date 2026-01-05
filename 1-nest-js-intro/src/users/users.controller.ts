import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  // Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('users')
// @UseGuards(AuthGuard) //* moze biti controller guard za sve rute u controlleru
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(AuthGuard)  //* moze biti route guard za pojedinacnu rutu
  getAllUsers(@Query() paginationDto: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationDto);
  }

  @Get(':id')
  // @UseGuards(AuthGuard)  //* moze biti route guard za pojedinacnu rutu
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   return this.usersService.createUser(user);
  // }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
