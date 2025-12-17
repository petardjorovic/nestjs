import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  public async getAllUsers() {
    return this.usersRepository.find();
  }

  public async createUser(userDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: userDto.email },
    });
    if (user) {
      return 'User with this email already exists';
    }
    let newUser = this.usersRepository.create(userDto);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }
}
