import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  public async getAllUsers() {
    return this.usersRepository.find();
  }

  public async createUser(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {};

    const user = this.usersRepository.create(userDto);

    return await this.usersRepository.save(user);
  }
}
